import { useState } from 'react'
import {Link} from 'react-router-dom' 
import { Button } from "../components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Library POS</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/books" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                Books
              </Link>
              <Link to="/customers" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                Customers
              </Link>
              <Link to="/users" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                Users
              </Link>
              <Link to="/sales" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                Sales
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" 
              aria-controls="mobile-menu" 
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/books" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Books
          </Link>
          <Link to="/customers" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Customers
          </Link>
          <Link to="/users" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Users
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="space-y-1">
            <Button variant="outline" className="w-full justify-center">Login</Button>
            <Button className="w-full justify-center">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

