import { Facebook, Twitter, LinkedIn, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SocialMediaShareProps {
  url: string
  title: string
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch((err) => console.error('Failed to copy: ', err))
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => window.open(shareLinks.facebook, '_blank')}>
        <Facebook className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button variant="outline" onClick={() => window.open(shareLinks.twitter, '_blank')}>
        <Twitter className="w-4 h-4 mr-2" />
        Tweet
      </Button>
      <Button variant="outline" onClick={() => window.open(shareLinks.linkedin, '_blank')}>
        <LinkedIn className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button variant="outline" onClick={copyToClipboard}>
        <Link className="w-4 h-4 mr-2" />
        Copy Link
      </Button>
    </div>
  )
}

export default SocialMediaShare