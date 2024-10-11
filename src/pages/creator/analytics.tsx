import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const CreatorAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([])
  const { databases, account } = useAppwrite()

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = await account.get()
        const response = await databases.listDocuments('creator_analytics', [
          databases.equal('creatorId', user.$id),
        ])
        setAnalyticsData(response.documents)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      }
    }

    fetchAnalytics()
  }, [databases, account])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Donations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="donations" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Memberships Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="memberships" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreatorAnalytics