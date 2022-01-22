import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { CourseEntity } from '../../courses/entities/course.entity'
import { UserEntity } from '../../users/entities/user.entity'

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  courseId: string

  @ManyToOne(() => CourseEntity, (course) => course.department)
  @JoinColumn()
  course: CourseEntity

  @Column()
  userId: string

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  @JoinColumn()
  user: UserEntity
}
