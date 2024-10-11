import { useState } from 'react'

interface FeaturedCampaignProps {
  title: string
  creator: string
  description: string
  goal: number
  current: number
}

const FeaturedCampaign: React.FC<FeaturedCampaignProps> = ({
  title,
  creator,
  description,
  goal,
  current,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const progress = (current / goal) * 100

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">by {creator}</p>
        <p className={`text-gray-700 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {description}
        </p>
        {!isExpanded && (
          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ${current.toLocaleString()} raised of ${goal.toLocaleString()} goal
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
          Support this campaign
        </button>
      </div>
    </div>
  )
}

export default FeaturedCampaign