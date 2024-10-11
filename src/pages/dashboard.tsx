import { useEffect, useState } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { account } = useAppwrite()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [account])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view your dashboard</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Overview</CardTitle>
              <CardDescription>Your activity at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Contributions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$0</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Memberships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Purchases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Commissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contributions">
          <Card>
            <CardHeader>
              <CardTitle>Your Contributions</CardTitle>
              <CardDescription>A list of your donations and support</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No contributions yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="memberships">
          <Card>
            <CardHeader>
              <CardTitle>Your Memberships</CardTitle>
              <CardDescription>Creators you're supporting monthly</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No active memberships.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Your Purchases</CardTitle>
              <CardDescription>Items you've bought from creators</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No purchases yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard