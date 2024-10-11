import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const BlockchainRoyalties = () => {
  const [royalties, setRoyalties] = useState([])
  const [newRoyalty, setNewRoyalty] = useState({ contentId: '', percentage: '' })
  const { databases, account } = useAppwrite()

  useEffect(() => {
    fetchRoyalties()
  }, [])

  const fetchRoyalties = async () => {
    try {
      const response = await databases.listDocuments('blockchain_royalties')
      setRoyalties(response.documents)
    } catch (error) {
      console.error('Error fetching royalties:', error)
    }
  }

  const createRoyalty = async (e) => {
    e.preventDefault()
    try {
      const user = await account.get()
      await databases.createDocument('blockchain_royalties', 'unique()', {
        ...newRoyalty,
        creatorId: user.$id,
        createdAt: new Date().toISOString(),
        // In a real blockchain implementation, you would interact with a smart contract here
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      })
      setNewRoyalty({ contentId: '', percentage: '' })
      fetchRoyalties()
    } catch (error) {
      console.error('Error creating royalty:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blockchain-based Royalty System</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Set Up a New Royalty</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createRoyalty} className="space-y-4">
            <Input
              placeholder="Content ID"
              value={newRoyalty.contentId}
              onChange={(e) => setNewRoyalty({ ...newRoyalty, contentId: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Royalty Percentage"
              value={newRoyalty.percentage}
              onChange={(e) => setNewRoyalty({ ...newRoyalty, percentage: e.target.value })}
              required
              min="0"
              max="100"
            />
            <Button type="submit">Set Royalty</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Your Royalty Agreements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {royalties.map((royalty) => (
          <Card key={royalty.$id}>
            <CardHeader>
              <CardTitle>Content ID: {royalty.contentId}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-2">{royalty.percentage}% Royalty</p>
              <p className="text-sm text-gray-600">
                Transaction Hash: {royalty.transactionHash.substr(0, 10)}...
              </p>
              <p className="text-sm text-gray-600">
                Created: {new Date(royalty.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlockchainRoyalties