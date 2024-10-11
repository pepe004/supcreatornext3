import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  creatorId: string
  creatorName: string
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { databases } = useAppwrite()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments('products')
        setProducts(response.documents)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [databases])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>By {product.creatorName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Shop