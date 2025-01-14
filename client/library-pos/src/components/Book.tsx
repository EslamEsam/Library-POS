import { useEffect, useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

interface Book {
  id: number
  title: string
  genre: string
  author: string
  year: number
  quantity: number
  price: number
}

const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch('/api/books')
    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }
    const data: Book[] = await response.json()
    return data
  }
  catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const data = await getBooks()
        setBooks(data)
        setError(null)
      } catch (err) {
        setError('Failed to load books. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const handleBuy = (bookId: number) => {
    console.log(`Buying book with id: ${bookId}`)
    // Here you would typically handle the purchase logic
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading books...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book List</h1>
      {books.length === 0 ? (
        <p className="text-center">No books available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="flex flex-col justify-between">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-1">Genre: {book.genre}</p>
                <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
                <p className="text-sm text-gray-600 mb-1">Year: {book.year}</p>
                <p className="text-sm text-gray-600 mb-1">In Stock: {book.quantity}</p>
                <p className="text-lg font-bold mt-2">${book.price.toFixed(2)}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button 
                  onClick={() => handleBuy(book.id)} 
                  className="w-full"
                  disabled={book.quantity === 0}
                >
                  {book.quantity > 0 ? 'Buy' : 'Out of Stock'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

