import { IBook } from "./IBook"

export interface ISaleDetail {
    book? : IBook
    id? : number
    bookId: number
    price: number
    quantity: number
    saleId?: number
  }
  