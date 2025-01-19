import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { getSales, getSalesByUserId } from '../API/SalesAPI'
import { Button } from '../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { getUsers } from '../API/UsersAPI'
import { ISale } from '../Interfaces/ISale'
import { ISaleDetail } from '../Interfaces/ISaleDetail'
import { IUser } from '../Interfaces/IUser'
import UserStore from '../Stores/UserStore'

export default function Sales() {
  const [sales, setSales] = useState<ISale[]>([])
  const [expandedSale, setExpandedSale] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [users, setUsers] = useState<IUser[]>([])
  const currentUser = UserStore((state) => state.user)


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (err) {
        setError('Failed to fetch users data: ' + err)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const allSales = await getSales()
        if (currentUser) {
          if (currentUser.isAdmin) {
            setSales(allSales)
          } else {
            const filteredSales = await getSalesByUserId(currentUser.userId)
            console.log(filteredSales)
            setSales(filteredSales)
          }
        }
      } catch (err) {
        setError('Failed to fetch sales data: ' + err)
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) {
      fetchSales()
    }
  }, [currentUser])

  const toggleSaleDetails = (saleId: number) => {
    setExpandedSale(expandedSale === saleId ? null : saleId)
  }

  if (loading) return <div>Loading sales data...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {currentUser?.isAdmin ? 'All Sales' : 'Your Sales'}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Sale Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <>
              <TableRow key={sale.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => sale.id !== undefined && toggleSaleDetails(sale.id)}
                  >
                    {expandedSale === sale.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{users.find(currentUser => currentUser.id === sale.userId)?.email || 'N/A'}</TableCell>
                <TableCell>{sale.customer?.name}</TableCell>
                <TableCell>${sale.totalPrice?.toFixed(2)}</TableCell>
                <TableCell>{sale.date}</TableCell>
              </TableRow>
              {expandedSale === sale.id && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <SaleDetailsTable details={sale.saleDetails} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function SaleDetailsTable({ details }: { details: ISaleDetail[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Book Title</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {details.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.book?.title}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
            <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

