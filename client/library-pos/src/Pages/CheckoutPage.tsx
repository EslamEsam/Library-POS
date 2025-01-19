import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CartStore from '../Stores/CartStore'
import { Button } from "../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { getCartByUserId, removeFromCart } from '../API/CartAPI'
import { Checkout } from '../API/SalesAPI'
import UsersStore from '../Stores/UserStore'
import { Input } from "../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { getCustomers } from '../API/CustomersAPI'
import { ICustomer } from '../Interfaces/ICustomer'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const setCart = CartStore((state) => state.setCart)
  const clearCart = CartStore((state) => state.logout)  
  const cartRef = useRef(CartStore((state) => state.cart))
  const user = UsersStore((state) => state.user)
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCart()
    fetchCustomers()
  }, )

  const fetchCart = async () => {
    const fetchedCart = await getCartByUserId(user.userId)
    cartRef.current = fetchedCart
    setCart(fetchedCart)
  }

  const fetchCustomers = async () => {
    const fetchedCustomers = await getCustomers()
    setCustomers(fetchedCustomers)
  }

  const handleRemoveItem = async (cartId: number) => {
    await removeFromCart(cartId)
    fetchCart()
  }

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      if (!selectedCustomer) {
        setIsLoading(false)
        console.log("Please select a customer.")
        return
      }
      const orderItems = {
        userId: cartRef.current[0].userId,
        CustomerId: selectedCustomer.id!,
        saleDetails: cartRef.current.map((item: { bookId: number; bookPrice: number; }) => ({
          bookId: item.bookId,
          Quantity: 1,
          bookPrice: item.bookPrice,
        })),
      }
      console.log(orderItems)
      const response = await Checkout(orderItems)
      if (!response.ok) {
        setIsLoading(false)
        setSuccessMessage("Failed to complete purchase. Please try again.")
        return
      }
      clearCart()
      setIsLoading(false)
      setSuccessMessage("Purchase completed successfully. Thank you for your purchase!")
      setTimeout(() => {
        navigate('/books')
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      setSuccessMessage("Failed to complete purchase. Please try again." + error)
    }
  }

  const total = cartRef.current?.reduce((sum: number, item: { bookPrice: number; bookQuantity: number }) => sum + item.bookPrice * item.bookQuantity, 0)

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex items-center space-x-4 mb-4">
        <Select 
          onValueChange={(value) => {
            const customer = customers.find(c => c.id?.toString() === value);
            setSelectedCustomer(customer || null);
          }}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select or search for a customer" />
          </SelectTrigger>
          <SelectContent>
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            {filteredCustomers?.map((customer) => (
              <SelectItem key={customer.id} value={customer.id?.toString() ?? ''}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => navigate('/add-customer')}>
          Add New Customer
        </Button>
      </div>
      {cartRef.current.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartRef.current?.map((item: { userId: number; bookTitle: string; bookPrice: number; bookQuantity: number; id: number }, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.bookTitle}</TableCell>
                  <TableCell>${item.bookPrice.toFixed(2)}</TableCell>
                  <TableCell>{item.bookQuantity}</TableCell>
                  <TableCell>${(item.bookPrice * item.bookQuantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total?.toFixed(2)}</p>
            <Button onClick={handlePurchase} disabled={isLoading || !selectedCustomer}>
              {isLoading ? 'Processing...' : 'Purchase'}
            </Button>
          </div>
        </>
      )}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  )
}

