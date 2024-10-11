import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
}

const Messaging = ({ receiverId }: { receiverId: string }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const { databases, account } = useAppwrite()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const user = await account.get()
        const response = await databases.listDocuments('messages', [
          databases.equal('senderId', user.$id),
          databases.equal('receiverId', receiverId),
        ])
        setMessages(response.documents)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()

    // Set up real-time listener
    const unsubscribe = databases.subscribe('messages', (response) => {
      if (response.events.includes('databases.*.collections.messages.documents.*.create')) {
        setMessages(prevMessages => [...prevMessages, response.payload])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [databases, account, receiverId])

  const sendMessage = async () => {
    try {
      const user = await account.get()
      await databases.createDocument('messages', 'unique()', {
        senderId: user.$id,
        receiverId,
        content: newMessage,
        createdAt: new Date().toISOString(),
      })
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <strong>{message.senderId === receiverId ? 'Creator' : 'You'}:</strong> {message.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="mr-2"
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Messaging