import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DetailedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    revenue: [],
    engagement: [],
    demographics: [],
    productPerformance: []
  })
  const { databases, account } = useAppwrite()

  useEffect(() => {
    const fetchDetailedAnalytics = async () => {
      try {
        const user = await account.get()
        const revenueData = await databases.listDocuments('creator_revenue', [databases.equal('creatorId', user.$id)])
        const engagementData = await databases.listDocuments('creator_engagement', [databases.equal('creatorId', user.$id)])
        const demographicsData = await databases.listDocuments('creator_demographics', [databases.equal('creatorId', user.$id)])
        const productPerformanceData = await databases.listDocuments('product_performance', [databases.equal('creatorId', user.$id)])

        setAnalyticsData({
          revenue: revenueData.documents,
          engagement: engagementData.documents,
          demographics: demographicsData.documents,
          productPerformance: productPerformanceData.documents
        })
      } catch (error) {
        console.error('Error fetching detailed analytics:', error)
      }
    }

    fetchDetailedAnalytics()
  }, [databases, account])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Detailed Creator Analytics</h1>
      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="productPerformance">Product Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="donations" stroke="#8884d8" />
                  <Line type="monotone" dataKey="memberships" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="sales" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.engagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#8884d8" />
                  <Bar dataKey="comments" fill="#82ca9d" />
                  <Bar dataKey="shares" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie dataKey="value" data={analyticsData.demographics} fill="#8884d8" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="productPerformance">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.productPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DetailedAnalytics