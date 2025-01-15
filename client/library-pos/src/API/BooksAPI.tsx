// all crud operations are done here for the books


interface Book {
    id: number
    title: string
    genre: string
    author: string
    year: number
    quantity: number
    price: number
}

// get all books
export const getBooks = async (): Promise<Book[]> => {
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


// get book by id
export const getBookById = async (id
    : number): Promise<Book | null> => {
    try {
      const response = await fetch(`/api/books/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch book')
      }
      const data: Book = await response.json()
      return data
    }
    catch (error) {
      console.error('Error fetching book:', error)
      throw error
    }
  }

// update book
export const updateBook = async (book: Book): Promise<void> => {
    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw new Error('Failed to update book')
      }
    }
    catch (error) {
      console.error('Error updating book:', error)
      throw error
    }
  }

// delete book
export const deleteBook = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete book')
      }
    }
    catch (error) {
      console.error('Error deleting book:', error)
      throw error
    }
  }

// add book
export const addBook = async (book: Book): Promise<void> => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
      if (!response.ok) {
        throw new Error('Failed to add book')
      }
    }
    catch (error) {
      console.error('Error adding book:', error)
      throw error
    }
  }

