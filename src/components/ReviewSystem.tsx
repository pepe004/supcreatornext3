import { useState, useEffect } from 'react'
import { useAppwrite } from '@/lib/appwrite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'

interface Review {
  id: string
  userId: string
  targetId: string
  rating: number
  comment: string
  createdAt: string
}

const ReviewSystem = ({ targetId, targetType }: { targetId: string; targetType: 'creator' | 'product' }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [userReview, setUserReview] = useState({ rating: 0, comment: '' })
  const { databases, account } = useAppwrite()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await databases.listDocuments('reviews', [
          databases.equal('targetId', targetId),
          databases.equal('targetType', targetType),
        ])
        setReviews(response.documents)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [databases, targetId, targetType])

  const handleRatingChange = (newRating: number) => {
    setUserReview({ ...userReview, rating: newRating })
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview({ ...userReview, comment: e.target.value })
  }

  const submitReview = async () => {
    try {
      const user = await account.get()
      await databases.createDocument('reviews', 'unique()', {
        userId: user.$id,
        targetId,
        targetType,
        rating: userReview.rating,
        comment: userReview.comment,
        createdAt: new Date().toISOString(),
      })
      // Refresh reviews after submission
      const response = await databases.listDocuments('reviews', [
        databases.equal('targetId', targetId),
        databases.equal('targetType', targetType),
      ])
      setReviews(response.documents)
      setUserReview({ rating: 0, comment: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews and Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= userReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={userReview.comment}
            onChange={handleCommentChange}
            className="mb-2"
          />
          <Button onClick={submitReview}>Submit Review</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">User Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p>{review.comment}</p>
              <small className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ReviewSystem