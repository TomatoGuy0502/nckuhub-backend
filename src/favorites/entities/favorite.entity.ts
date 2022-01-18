import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { Course } from '../../courses/entities/course.entity'
import { User } from '../../users/entities/user.entity'

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  courseId: string

  @ManyToOne(() => Course, (course) => course.department)
  @JoinColumn()
  course: Course

  @Column()
  userId: string

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn()
  user: User
}
