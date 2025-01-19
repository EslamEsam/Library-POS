// all crud operations are done here for the users

import { IUser } from "../Interfaces/IUser"

// get all users
export const getUsers = async (): Promise<IUser[]> => {
    try {
        const response = await fetch('/api/users')
        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }
        const data: IUser[] = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
}

// get user by id
export const getUserById = async (userId: string): Promise<IUser | null> => {
    try {
        const response = await fetch(`/api/users/${userId}`)
        if (!response.ok) {
            throw new Error('Failed to fetch user')
        }
        const data: IUser = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching user:', error)
        throw error
    }
}

// register user
export const registerUser = async (user: IUser): Promise<Response> => {
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error('Failed to register user')
        }
        return response
    }
    catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

// login user
export const loginUser = async (user: IUser): Promise<Response> => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error('Failed to login user')
        }
        return response
    }
    catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}