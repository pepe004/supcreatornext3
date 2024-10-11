import { useState } from 'react'
import { Coffee, Gift, ShoppingBag, Palette, Users, Zap, Video, Coins } from 'lucide-react'
import CreatorCard from '@/components/CreatorCard'
import FeaturedCampaign from '@/components/FeaturedCampaign'
import Link from 'next/link'

export default function Home() {
  const [featuredCreators] = useState([
    { id: 1, name: 'Alice Wonder', category: 'Artist', imageUrl: 'https://source.unsplash.com/random/400x400?portrait=1' },
    { id: 2, name: 'Bob Coder', category: 'Developer', imageUrl: 'https://source.unsplash.com/random/400x400?portrait=2' },
    { id: 3, name: 'Carol Musician', category: 'Musician', imageUrl: 'https://source.unsplash.com/random/400x400?portrait=3' },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Support Your Favorite Creators</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeaturedCampaign
            title="New Album Release"
            creator="Carol Musician"
            description="Support my latest album and get exclusive perks!"
            goal={5000}
            current={3750}
          />
          <FeaturedCampaign
            title="Art Commission Series"
            creator="Alice Wonder"
            description="Commission a custom piece and support my art journey!"
            goal={2000}
            current={1200}
          />
          <FeaturedCampaign
            title="Open Source Project Funding"
            creator="Bob Coder"
            description="Help fund the development of my latest open-source tool!"
            goal={10000}
            current={7500}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Unique Features for Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/collaboration-hub" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Collaboration Hub</h3>
              <p>Connect and collaborate with other creators</p>
            </div>
          </Link>
          <Link href="/ai-insights" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p>Get content recommendations and performance analytics</p>
            </div>
          </Link>
          <Link href="/live-streaming" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Video className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Interactive Live Streaming</h3>
              <p>Engage with your audience in real-time</p>
            </div>
          </Link>
          <Link href="/blockchain-royalties" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Coins className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Royalties</h3>
              <p>Secure and transparent revenue sharing</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ways to Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Coffee className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">One-time Donations</h3>
            <p>Show your appreciation with a quick donation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Gift className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Memberships</h3>
            <p>Get exclusive perks with monthly support</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">Shop</h3>
            <p>Purchase creator merchandise and digital goods</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Palette className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-semibold mb-2">Commissions</h3>
            <p>Request custom work from your favorite creators</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCreators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))}
        </div>
      </section>
    </div>
  )
}