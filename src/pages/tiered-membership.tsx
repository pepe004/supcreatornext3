import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const TieredMembership = () => {
  const [tiers, setTiers] = useState([])
  const [newTier, setNewTier] = useState({ name: '', price: '', benefits: '' })
  const { databases, account } = useAppwrite()

  useEffect(() => {
    fetchTiers()
  }, [])

  const fetchTiers = async () => {
    try {
      const response = await databases.listDocuments('membership_tiers')
      setTiers(response.documents)
    } catch (error) {
      console.error('Error fetching tiers:', error)
    }
  }

  const createTier = async (e) => {
    e.preventDefault()
    try {
      const user = await account.get()
      await databases.createDocument('membership_tiers', 'unique()', {
        ...newTier,
        creatorId: user.$id,
        createdAt: new Date().toISOString(),
      })
      setNewTier({ name: '', price: '', benefits: '' })
      fetchTiers()
    } catch (error) {
      console.error('Error creating tier:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tiered Membership System</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Membership Tier</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createTier} className="space-y-4">
            <Input
              placeholder="Tier Name"
              value={newTier.name}
              onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Monthly Price"
              value={newTier.price}
              onChange={(e) => setNewTier({ ...newTier, price: e.target.value })}
              required
            />
            <Input
              placeholder="Benefits (comma-separated)"
              value={newTier.benefits}
              onChange={(e) => setNewTier({ ...newTier, benefits: e.target.value })}
              required
            />
            <Button type="submit">Create Tier</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Your Membership Tiers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.$id}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-2">${tier.price}/month</p>
              <ul className="list-disc list-inside">
                {tier.benefits.split(',').map((benefit, index) => (
                  <li key={index}>{benefit.trim()}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TieredMembership