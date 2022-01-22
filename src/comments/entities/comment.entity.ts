import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UserEntity } from 'src/users/entities/user.entity'
import { CourseEntity } from 'src/courses/entities/course.entity'

@Entity('comments')
export class CommentEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity

  @ManyToOne(() => CourseEntity, (course) => course.comments)
  course: CourseEntity
}
