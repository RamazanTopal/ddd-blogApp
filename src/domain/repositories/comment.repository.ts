import { IComment } from '../entities/index.entity'

export interface ComentFindAllOptions {
  where?: {}
  select?: {}
}
export default interface ICommentRepository {
  deleteOne(id: number): Promise<IComment | undefined>
  findMany(): Promise<IComment[]>
  findUnique(id: number): Promise<IComment | undefined>
  findManyByOptions(opts: ComentFindAllOptions): Promise<IComment[]>
  create({ message, userId, postId, commentParentId }): Promise<IComment | undefined>
  update({ id, message }): Promise<IComment | undefined>
}
