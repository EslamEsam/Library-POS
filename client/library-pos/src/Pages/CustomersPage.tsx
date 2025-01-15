import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { getCustomers } from "../API/CustomersAPI"
import { useEffect, useState } from "react"


interface Customer {
  name: string
  address: string
  phoneNumber: string
  numberOfPurchases: number
}


const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true)
        const data = await getCustomers()
        setCustomers(data)
        setIsLoading(false)
      } catch (err) {
        console.log("Failed to load customers. Please try again later.", err)
      }
    }
    fetchCustomers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex-grow"></div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Customer Data</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Number of Purchases</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.numberOfPurchases}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex-grow"></div>
    </div>
    </>
  )
}

export default CustomersPage