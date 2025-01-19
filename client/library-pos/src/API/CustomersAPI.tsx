// all crud operations are done here for the customers

import { ICustomer } from "../Interfaces/ICustomer"


// get all customers
export const getCustomers = async (): Promise<ICustomer[]> => {
    try {
        const response = await fetch('/api/customers')
        if (!response.ok) {
            throw new Error('Failed to fetch customers')
        }
        const data: ICustomer[] = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching customers:', error)
        throw error
    }
}

// get customer by id
export const getCustomerById = async (id: number): Promise<ICustomer | null> => {
    try {
        const response = await fetch(`/api/customers/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch customer')
        }
        const data: ICustomer = await response.json()
        return data
    }
    catch (error) {
        console.error('Error fetching customer:', error)
        throw error
    }
}

// update customer
export const updateCustomer = async (customer: ICustomer): Promise<void> => {
    try {
        const response = await fetch(`/api/customers/${customer.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        if (!response.ok) {
            throw new Error('Failed to update customer')
        }
    }
    catch (error) {
        console.error('Error updating customer:', error)
        throw error
    }
}

// delete customer
export const deleteCustomer = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`/api/customers/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('Failed to delete customer')
        }
    }
    catch (error) {
        console.error('Error deleting customer:', error)
        throw error
    }
}

// create customer
export const addCustomer = async (customer: ICustomer): Promise<void> => {
    try {
        const response = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        if (!response.ok) {
            throw new Error('Failed to create customer')
        }
        console.log('ICustomer created successfully')
    }
    catch (error) {
        console.error('Error creating customer:', error)
        throw error
    }
}