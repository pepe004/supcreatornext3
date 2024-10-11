import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CreatorCard from '@/components/CreatorCard'

interface Creator {
  id: string
  name: string
  category: string
  imageUrl: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  creatorId: string
}

const RecommendationSystem = ({ userId }: { userId: string }) => {
  const [recommendedCreators, setRecommendedCreators] = useState<Creator[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const { databases } = useAppwrite()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Fetch user's interests and past interactions
        const userInteractions = await databases.listDocuments('user_interactions', [
          databases.equal('userId', userId)
        ])

        // Use the interactions to fetch recommended creators
        const creatorResponse = await databases.listDocuments('creators', [
          // Add filters based on user interactions
        ])
        setRecommendedCreators(creatorResponse.documents)

        // Use the interactions to fetch recommended products
        const productResponse = await databases.listDocuments('products', [
          // Add filters based on user interactions
        ])
        setRecommendedProducts(productResponse.documents)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      }
    }

    fetchRecommendations()
  }, [databases, userId])

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recommended Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCreators.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recommended Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecommendationSystem