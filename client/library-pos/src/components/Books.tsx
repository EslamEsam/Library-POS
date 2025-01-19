import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { getBooks } from "../API/BooksAPI";
import { addToCart, getCartByUserId } from "../API/CartAPI"; // Import the addToCart method
import { useEffect, useState } from "react";
import CartStore from "../Stores/CartStore";
import UserStore from "../Stores/UserStore";
import {Link} from 'react-router-dom';
import { IBook } from "../Interfaces/IBook";

export default function BookList() {
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<IBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const setCart = CartStore((state) => state.setCart)
  const user = UserStore((state) => state.user)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data);
        setIsLoading(false);
        if (user && user.isAdmin !== undefined) {
          setIsAdmin(user.isAdmin);
        }
      } catch (err) {
        console.log("Failed to load books. Please try again later.", err);
      }
    };
    fetchBooks();
  }, [user]);

  useEffect(() => {
    if (books) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (genreFilter === "all" || book.genre === genreFilter) &&
          (authorFilter === "all" || book.author === authorFilter) &&
          (yearFilter === "all" || book.year.toString() === yearFilter)
      );
      setFilteredBooks(filtered);
    }
  }, [books, searchTerm, genreFilter, authorFilter, yearFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setGenreFilter("all");
    setAuthorFilter("all");
    setYearFilter("all");
  };

  // New function to handle adding a book to the cart
  const handleAddToCart = async (book: IBook) => {
    console.log(user.userId)
    try {
      if (book.id !== undefined) {
        const newItem = {
          "userId": user.userId,
          "bookId": book.id,
          "bookQuantity": 1,
          "bookTitle": book.title,
          "bookPrice": book.price
        }
        const response = await addToCart(newItem);
      console.log(response);
      if (response.ok) {
        console.log("IBook added to cart successfully");
        const newcart = await getCartByUserId(user.userId)
        setCart(newcart)
        console.log(newcart)
        } 
      }
    } catch (error) {
      console.error("Error adding book to cart:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading books...</div>;
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-8">
        No books available at the moment.
      </div>
    );
  }

  const uniqueGenres = Array.from(
    new Set(books?.map((book) => book.genre) || [])
  );
  const uniqueAuthors = Array.from(
    new Set(books?.map((book) => book.author) || [])
  );
  const uniqueYears = Array.from(
    new Set(books?.map((book) => book.year) || [])
  ).sort((a, b) => b - a);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book List</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64"
        />
        <Select value={genreFilter} onValueChange={setGenreFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {uniqueGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={authorFilter} onValueChange={setAuthorFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {uniqueAuthors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={resetFilters}
          variant="outline"
          className="w-full md:w-auto"
        >
          Reset Filters
        </Button>
        {isAdmin && (
          <Link to="/add-book">
            <Button variant="outline" className="w-full md:w-auto">
              Add Book
            </Button>
          </Link>
        )}
      </div>
      {filteredBooks && filteredBooks.length === 0 ? (
        <div className="text-center py-8">
          <p>We don't have this book at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks?.map((book: IBook) => (
            <Card key={book.id} className="flex flex-col justify-between">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-1">Genre: {book.genre}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Author: {book.author}
                </p>
                <p className="text-sm text-gray-600 mb-1">Year: {book.year}</p>
                <p
                  className={
                    book.quantity > 0
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {book.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p className="text-lg font-bold mt-2">${book.price.toFixed(2)}</p>
              </CardContent>
              <div className="p-6 pt-0">
                {user ? (
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(book)}
                    disabled={book.quantity === 0}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <p className="text-center text-gray-500">Log in to add to cart</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
