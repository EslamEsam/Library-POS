// all crud operations are done here for the cart

import { ICart } from "../Interfaces/ICart"


// get cart by user id
export const getCartByUserId = async (userId: string) => {
    try {
      const response = await fetch(`/api/carts/getcartbyuserid/${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }
      const data: ICart[] = await response.json()
      return data
    }
    catch (error) {
      console.error('Error fetching cart:', error)
      throw error
    }
  }


// add to cart
export const addToCart = async (cart: ICart) => {
    try {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
      })
  
      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }
      return response
    }
    catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

// remove from cart
export const removeFromCart = async (cartId: number) => {
    try {
      const response = await fetch(`/api/carts/${cartId}`, {
        method: 'DELETE'
      })
  
      if (!response.ok) {
        throw new Error('Failed to remove from cart')
      }
      else {
        console.log('Removed from cart')
      }
    }
    catch (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  }


