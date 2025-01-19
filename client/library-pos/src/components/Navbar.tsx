import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { ChevronDown, ShoppingCart, User } from 'lucide-react'
import UsersStore from '../Stores/UserStore'
import CartStore from '../Stores/CartStore'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = UsersStore((state) => state.user)
  const clearUser = UsersStore((state) => state.logout)
  const isLoggedIn = !!user?.userId
  const isAdmin = user?.isAdmin
  const cart = CartStore((state) => state.cart)


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Souq El Kotob</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/books" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                Books
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/customers" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                    Customers
                  </Link>
                  <Link to="/sales" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                    Purchases
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link to="/users" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700">
                  Users
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Hi, {user.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={clearUser}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative">
                      <ShoppingCart className="h-4 w-4" />
                      {cart?.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cart.reduce((total: number, item: { bookQuantity: number }) => total + item.bookQuantity, 0)}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-2">
                    {cart?.length > 0 ? (
                      <>
                        <DropdownMenuItem className="font-bold">
                          <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 w-full">
                            <span>Title</span>
                            <span>Price</span>
                            <span>Qty</span>
                            <span>Total</span>
                          </div>
                        </DropdownMenuItem>
                        {cart?.map((item: { userId: string; bookTitle: string; bookPrice: number; bookQuantity: number }, index: number) => (
                          <DropdownMenuItem key={index} className="px-2 py-1">
                            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 w-full text-sm">
                              <span className="whitespace-normal">{item.bookTitle}</span>
                              <span>${item.bookPrice.toFixed(2)}</span>
                              <span>{item.bookQuantity}</span>
                              <span>${(item.bookPrice * item.bookQuantity).toFixed(2)}</span>
                            </div>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem className="font-bold">
                          <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 w-full border-t pt-2 mt-2">
                            <span className="col-span-3 text-right">Total:</span>
                            <span>
                              ${cart?.reduce((total:number, item: { bookPrice: number; bookQuantity: number }) => total + item.bookPrice * item.bookQuantity, 0).toFixed(2)}
                            </span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="justify-center">
                          <Link to="/checkout" className="w-full">
                            <Button className="w-full">Checkout</Button>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem>Your cart is empty</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
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
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/books" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Books
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/customers" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Customers
              </Link>
              <Link to="/sales" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Sales
              </Link>
            </>
          )}
          {isAdmin && (
            <Link to="/users" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Users
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="space-y-1">
            {isLoggedIn ? (
              <>
                <p className="block px-4 py-2 text-base font-medium text-gray-500">Hi, {user.email}</p>
                <Link to="/checkout" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Checkout 
                </Link>
                <button
                  onClick={clearUser}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full justify-center">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full justify-center">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

