import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Checkbox } from "../components/ui/checkbox"
import { getUsers } from "../API/UsersAPI"
import { useEffect, useState } from "react"

interface User {
  username: string
  phoneNumber: string
  isAdmin: boolean
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const data = await getUsers()
        setUsers(data)
        setIsLoading(false)
      } catch (err) {
        console.log("Failed to load users. Please try again later.", err)
      }
    }
    fetchUsers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <>
    <div className="container mx-auto p-4 space-y-8">
    <div className="flex-grow"></div>
        <div >
        <h2 className="text-2xl font-bold mb-4">User Data</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <Checkbox checked={user.isAdmin} disabled />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default UsersPage