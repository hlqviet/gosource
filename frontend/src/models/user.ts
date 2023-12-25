import { Role } from '../lib/enums'

export default interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: Role
  createdAt: string
}
