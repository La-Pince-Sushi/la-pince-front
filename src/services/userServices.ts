import { IUser } from "../types"
import { apiRequest } from "../utils/apiRequest"

/**
 * Retrieves the current user's information from the API.
 * 
 * @returns {Promise<Partial<IUser>>} - A promise containing the user's information.
 */
export async function getMe(): Promise<Partial<IUser>> {
  return apiRequest<Partial<IUser>>(`me`)
}

/**
 * Updates the current user's information in the API.
 * 
 * @param {Partial<IUser>} data - The updated user data.
 * @returns {Promise<Partial<IUser>>} - A promise containing the updated user information.
 */
export async function updateUser(data: Partial<IUser>): Promise<Partial<IUser>> {
  return apiRequest<Partial<IUser>>(`me`, 'PATCH', data)
}

/**
 * Deletes the current user's account from the API.
 * 
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 */
export async function deleteUser(): Promise<void> {
  return apiRequest(`me`, 'DELETE');
}