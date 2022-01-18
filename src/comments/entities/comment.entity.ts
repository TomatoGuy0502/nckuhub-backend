import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { Course } from 'src/courses/entities/course.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    length: 500
  })
  text: string

  @Column()
  got: number

  @Column()
  sweet: number

  @Column()
  cold: number

  @Column()
  userId: string

  @Column()
  courseId: string

  @ManyToOne(() => User, (user) => user.comments)
  user: User

  @ManyToOne(() => Course, (course) => course.comments)
  course: Course
}
