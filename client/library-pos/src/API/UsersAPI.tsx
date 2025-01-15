// all crud operations are done here for the users

interface User {
    username: string
    phoneNumber: string
    isAdmin: boolean
}

// get all users
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('/api/users')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        const data: User[] = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
}

// get user by id
export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const response = await fetch(`/api/users/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch customer')
        }
        const data: User = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching customer:', error)
        throw error
    }
}

// update user
export const updateUser = async (user: User): Promise<void> => {
    try {
        const response = await fetch(`/api/users/${user.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error('Failed to update user')
        }
    }
    catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}

// delete user
export const deleteUser = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('Failed to delete user')
        }
    }
    catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}

// create user
export const createUser = async (user: User): Promise<void> => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error('Failed to create user')
        }
    }
    catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}
