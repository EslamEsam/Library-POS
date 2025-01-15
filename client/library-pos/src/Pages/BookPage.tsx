import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { getBookById } from "../API/BooksAPI"

interface Book {
  id: number
  title: string
  genre: string
  author: string
  year: number
  quantity: number
  price: number
}

export function BookPage() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return
      try {
        setIsLoading(true)
        const data = await getBookById(parseInt(id))
        setBook(data)
      } catch (err) {
        console.log('Failed to load book. Please try again later.',err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleBuy = (bookId: number) => {
    console.log(`Buying book with id: ${bookId}`)
    // Here you would typically handle the purchase logic
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading book...</div>
  }



  if (!book) {
    return <div className="text-center py-8">Book not found.</div>
  }

  return (

    <>
  <div className="container mx-auto py-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Book Details</h1>
      <Link to="/books">
        <Button className="w-auto">
          Go Back
        </Button>
      </Link>
    </div>
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-1">Genre: {book.genre}</p>
        <p className="text-gray-600 mb-1">Author: {book.author}</p>
        <p className="text-gray-600 mb-1">Year: {book.year}</p>
        <p className="text-gray-600 mb-1">In Stock: {book.quantity}</p>
        <p className="text-xl font-bold mt-4">${book.price.toFixed(2)}</p>
        <Button
          onClick={() => handleBuy(book.id)}
          className="w-full mt-4"
          disabled={book.quantity === 0}
        >
          {book.quantity > 0 ? 'Buy' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  </div>
</>

  )
}

export default BookPage

