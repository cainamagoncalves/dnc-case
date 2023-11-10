interface Course {
  id: number
  name: string
  resume: string
  description: string
  imageUrl: string
  requirements: Requirement[]
  instructor: Instructor
  ratings: Rating[]
  contents: Content[]
  students: User[]
}
