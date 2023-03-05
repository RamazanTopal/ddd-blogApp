export default interface IComment {
  id: number
  message: string
  postId: number
  userId: number
  commentParentId: number | null
}
