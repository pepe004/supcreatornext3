import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const Commissions = () => {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const { databases } = useAppwrite()

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await databases.listDocuments('creators')
        setCreators(response.documents)
      } catch (error) {
        console.error('Error fetching creators:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCreators()
  }, [databases])

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Implement commission request submission logic here
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Request a Commission</h1>
      <Card>
        <CardHeader>
          <CardTitle>Commission Request Form</CardTitle>
          <CardDescription>Fill out the details for your commission request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="creator" className="block text-sm font-medium text-gray-700">
                Select Creator
              </label>
              <select
                id="creator"
                name="creator"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {creators.map((creator) => (
                  <option key={creator.id} value={creator.id}>
                    {creator.name}
                  </option>
                ))}
              </select>
            </div>
            <Input placeholder="Commission Title" />
            <Textarea placeholder="Describe your commission request" />
            <Input type="number" placeholder="Budget" />
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Commissions