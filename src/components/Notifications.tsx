import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Notification {
  id: string
  message: string
  createdAt: string
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { databases, account } = useAppwrite()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = await account.get()
        const response = await databases.listDocuments('notifications', [
          databases.equal('userId', user.$id),
        ])
        setNotifications(response.documents)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchNotifications()

    // Set up real-time listener
    const unsubscribe = databases.subscribe('notifications', (response) => {
      if (response.events.includes('databases.*.collections.notifications.documents.*.create')) {
        setNotifications(prevNotifications => [...prevNotifications, response.payload])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [databases, account])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="mb-2">
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default Notifications