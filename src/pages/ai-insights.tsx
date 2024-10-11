import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const AIInsights = () => {
  const [content, setContent] = useState('')
  const [insights, setInsights] = useState(null)
  const { databases, account } = useAppwrite()

  const generateInsights = async () => {
    try {
      // In a real-world scenario, you would call an AI service here
      // For this example, we'll simulate AI-generated insights
      const simulatedInsights = {
        sentiment: Math.random() > 0.5 ? 'Positive' : 'Negative',
        engagement_score: Math.floor(Math.random() * 100),
        key_topics: ['creativity', 'inspiration', 'technology'].sort(() => 0.5 - Math.random()).slice(0, 2),
        improvement_suggestions: [
          'Consider adding more visual elements',
          'Try to engage with your audience through questions',
          'Explore trending topics in your niche'
        ].sort(() => 0.5 - Math.random()).slice(0, 2)
      }

      setInsights(simulatedInsights)

      // Store the insights in the database
      const user = await account.get()
      await databases.createDocument('content_insights', 'unique()', {
        creatorId: user.$id,
        content,
        insights: simulatedInsights,
        createdAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error generating insights:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Powered Content Insights</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analyze Your Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your content here for analysis..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="mb-4"
          />
          <Button onClick={generateInsights}>Generate Insights</Button>
        </CardContent>
      </Card>

      {insights && (
        <Card>
          <CardHeader>
            <CardTitle>Content Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Sentiment:</strong> {insights.sentiment}</p>
            <p><strong>Engagement Score:</strong> {insights.engagement_score}/100</p>
            <p><strong>Key Topics:</strong> {insights.key_topics.join(', ')}</p>
            <p><strong>Improvement Suggestions:</strong></p>
            <ul>
              {insights.improvement_suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AIInsights