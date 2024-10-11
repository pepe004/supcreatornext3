import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppwrite } from '@/lib/appwrite'

const CreatorProfile = () => {
  const router = useRouter()
  const { id } = router.query
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const { databases } = useAppwrite()

  useEffect(() => {
    const fetchCreator = async () => {
      if (id) {
        try {
          const response = await databases.getDocument('creators', id as string)
          setCreator(response)
        } catch (error) {
          console.error('Error fetching creator:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchCreator()
  }, [id, databases])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!creator) {
    return <div>Creator not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={creator.imageUrl}
            alt={creator.name}
            width={400}
            height={400}
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{creator.name}</h1>
          <p className="text-gray-600">{creator.category}</p>
          <p className="mt-4">{creator.bio}</p>
        </div>
        <div className="md:w-2/3">
          <Tabs defaultValue="support">
            <TabsList>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="shop">Shop</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
            </TabsList>
            <TabsContent value="support">
              <Card>
                <CardHeader>
                  <CardTitle>Support {creator.name}</CardTitle>
                  <CardDescription>Choose a support option below</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full">One-time Donation</Button>
                    <Button className="w-full">Become a Member</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shop">
              <Card>
                <CardHeader>
                  <CardTitle>{creator.name}'s Shop</CardTitle>
                  <CardDescription>Browse and purchase items</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add shop items here */}
                  <p>Shop items coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="commissions">
              <Card>
                <CardHeader>
                  <CardTitle>Request a Commission</CardTitle>
                  <CardDescription>Fill out the form to request a custom work</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input placeholder="Commission Title" />
                    <Input placeholder="Description" />
                    <Input type="number" placeholder="Budget" />
                    <Button type="submit">Submit Request</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CreatorProfile