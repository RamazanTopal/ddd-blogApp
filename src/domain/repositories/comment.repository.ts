import { IComment } from '../entities/index.entity'

export default interface ICommentRepository {
  deleteOne(id: number): Promise<IComment | undefined>
  findMany(): Promise<IComment[]>
  findUnique(id: number): Promise<IComment | undefined>
  create({ message, userId, postId }): Promise<IComment | undefined>
  update({ id, message, userId, postId }): Promise<IComment | undefined>
}
