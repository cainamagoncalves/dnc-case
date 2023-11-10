interface Rating {
  id: number
  value: number
  rated_by: Pick<User, 'id' | 'name' | 'photo' | 'role'>
  description: string
}
