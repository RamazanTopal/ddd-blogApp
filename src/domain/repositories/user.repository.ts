import { IUser } from '../entities/index.entity'

export default interface IUserRepository {
  deleteOne(id: number): Promise<IUser | undefined>
  findMany(): Promise<IUser[]>
  findUnique(id: number): Promise<IUser | undefined>
  register({ name, email, phone, password }): Promise<IUser | undefined>
  update({ id, name, email, phone }): Promise<IUser | undefined>
  findOneByEmail(email: string): Promise<IUser | undefined>
}
