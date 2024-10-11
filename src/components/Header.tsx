import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CreatorSupport
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/explore" className="text-gray-600 hover:text-blue-600">
            Explore
          </Link>
          <Link href="/shop" className="text-gray-600 hover:text-blue-600">
            Shop
          </Link>
          <Link href="/collaboration-hub" className="text-gray-600 hover:text-blue-600">
            Collaborate
          </Link>
          <Link href="/ai-insights" className="text-gray-600 hover:text-blue-600">
            AI Insights
          </Link>
          <Link href="/live-streaming" className="text-gray-600 hover:text-blue-600">
            Live
          </Link>
        </nav>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link href="/explore" className="text-gray-600 hover:text-blue-600">
              Explore
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-blue-600">
              Shop
            </Link>
            <Link href="/collaboration-hub" className="text-gray-600 hover:text-blue-600">
              Collaborate
            </Link>
            <Link href="/ai-insights" className="text-gray-600 hover:text-blue-600">
              AI Insights
            </Link>
            <Link href="/live-streaming" className="text-gray-600 hover:text-blue-600">
              Live
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header