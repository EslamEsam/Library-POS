// all crud operations are done here for the sales

import { ISale } from "../Interfaces/ISale"

// get all sales
export const getSales = async (): Promise<ISale[]> =>  {
    try {
      const response = await fetch('/api/sales')
      if (!response.ok) {
        throw new Error('Failed to fetch sales')
      }
      const data: ISale[] = await response.json()
      return data
    }
    catch (error) {
      console.error('Error fetching sales:', error)
      throw error
    }
  }


// get sales by user id
export const getSalesByUserId = async (userId: string): Promise<ISale[]> => {
    try {
      const response = await fetch(`/api/sales/user/${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch sales')
      }
      const data: ISale[] = await response.json()
      return data
    }
    catch (error) {
      console.error('Error fetching sales:', error)
      throw error
    }
  }

// checkout
export const Checkout = async (sales: ISale):Promise<Response> => {
    try {
      console.log(JSON.stringify(sales))
      const response = await fetch('/api/sales/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sales)
      })
  
      if (!response.ok) {
        throw new Error('Failed to checkout')
      }
        return response
    }
    catch (error) {
      console.error('Error checking out:', error)
      throw error
    }
  }
