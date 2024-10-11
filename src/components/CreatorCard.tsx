import Image from 'next/image'
import Link from 'next/link'

interface CreatorCardProps {
  id: number
  name: string
  category: string
  imageUrl: string
}

const CreatorCard: React.FC<CreatorCardProps> = ({ id, name, category, imageUrl }) => {
  return (
    <Link href={`/creator/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-gray-600">{category}</p>
        </div>
      </div>
    </Link>
  )
}

export default CreatorCard