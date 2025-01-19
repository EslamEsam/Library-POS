import { ICustomer } from "./ICustomer"
import { ISaleDetail } from "./ISaleDetail"

export interface ISale {
    id? : number
    userId: string
    CustomerId: number
    totalPrice?: number
    date?: string
    saleDetails: ISaleDetail[]
    customer?: ICustomer
  }