import { IUser } from "../types"
import { apiRequest } from "../utils/apiRequest"


export async function getMe(): Promise<Partial<IUser>> {
  return apiRequest<Partial<IUser>>(`me`)
}

export async function updateUser(data: Partial<IUser>): Promise<Partial<IUser>> {
  return apiRequest<Partial<IUser>>(`me`, 'PATCH', data)
}

export async function deleteUser(): Promise<void> {
  return apiRequest(`me`, 'DELETE');
}