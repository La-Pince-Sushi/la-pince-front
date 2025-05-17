// # TYPE

export type TExpenses = IExpense[]

export type TCategories = ICategory[]

export type TBudgets = IBudget[]

export type THttpMethods = "GET" | "POST" | "PATCH" | "DELETE" | "PUT"

// # INTERFACE

export interface IStoreError {
  message: string
  details: string[]
}

export interface ICategory {
  id?: number
  name: string
}

export interface IExpense {
  id: number | string
  description: string
  amount: number
  date: string
  category_id: string | number
  category?: { name: string } | null
}

export interface IBudget {
  id: number | string
  amount: number | string
  alert?: number
  category_id?: string | number
  category?: { name: string } | null
}

export interface IUser {
  id: number
  email: string
  password: string
  created_at?: string
  updated_at?: string
}

export interface IAuthStore {
  token: string | null
  refreshToken: string | null
  error: IStoreError | null
  isLoading: boolean
  isAuthChecked: boolean
  checkAuth: () => Promise<void>
  refreshAccessToken: () => Promise<string | null>
  clearTokenState: () => void
  register: (email: string, password: string) => Promise<boolean | void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export interface IParsedError {
  message: string
  details?: string[]
  statusCode?: number
}