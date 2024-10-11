import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const LiveStreaming = () => {
  const [streams, setStreams] = useState([])
  const [newStream, setNewStream] = useState({ title: '', description: '' })
  const { databases, account } = useAppwrite()

  useEffect(() => {
    fetchStreams()
  }, [])

  const fetchStreams = async () => {
    try {
      const response = await databases.listDocuments('live_streams')
      setStreams(response.documents)
    } catch (error) {
      console.error('Error fetching streams:', error)
    }
  }

  const createStream = async (e) => {
    e.preventDefault()
    try {
      const user = await account.get()
      await databases.createDocument('live_streams', 'unique()', {
        ...newStream,
        creatorId: user.$id,
        status: 'scheduled',
        scheduledFor: new Date(Date.now() + 3600000).toISOString(), // Schedule for 1 hour from now
        createdAt: new Date().toISOString(),
      })
      setNewStream({ title: '', description: '' })
      fetchStreams()
    } catch (error) {
      console.error('Error creating stream:', error)
    }
  }

  const startStream = async (streamId) => {
    try {
      await databases.updateDocument('live_streams', streamId, {
        status: 'live',
        startedAt: new Date().toISOString(),
      })
      fetchStreams()
    } catch (error) {
      console.error('Error starting stream:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Interactive Live Streaming</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Schedule a New Live Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createStream} className="space-y-4">
            <Input
              placeholder="Stream Title"
              value={newStream.title}
              onChange={(e) => setNewStream({ ...newStream, title: e.target.value })}
              required
            />
            <Input
              placeholder="Stream Description"
              value={newStream.description}
              onChange={(e) => setNewStream({ ...newStream, description: e.target.value })}
              required
            />
            <Button type="submit">Schedule Stream</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Your Live Streams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream) => (
          <Card key={stream.$id}>
            <CardHeader>
              <CardTitle>{stream.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{stream.description}</p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-semibold">{stream.status}</span>
              </p>
              {stream.status === 'scheduled' && (
                <Button className="mt-4" onClick={() => startStream(stream.$id)}>
                  Start Stream
                </Button>
              )}
              {stream.status === 'live' && (
                <Button className="mt-4" disabled>
                  Live Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LiveStreaming