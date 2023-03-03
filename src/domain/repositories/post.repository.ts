import { IPost } from '../entities/index.entity'

export default interface IUserRepository {
  deleteOne(id: number): Promise<IPost | undefined>
  findMany(): Promise<IPost[]>
  findUnique(id: number): Promise<IPost | undefined>
  create({ title, content, authorId }): Promise<IPost | undefined>
  update({ id, title, content, authorId }): Promise<IPost | undefined>
}
