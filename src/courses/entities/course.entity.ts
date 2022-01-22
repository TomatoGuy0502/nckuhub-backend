import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { DepartmentEntity } from '../../departments/entities/department.entity'
import { CommentEntity } from '../../comments/entities/comment.entity'
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity'

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  courseCode: number

  @Column()
  name: string

  @Column()
  teacher: string

  @Column()
  time: string

  @Column()
  credit: number

  @Column()
  commentsCount: number

  @Column()
  semester: string

  @ManyToOne(() => DepartmentEntity, (department) => department.course)
  @JoinColumn()
  department: DepartmentEntity

  @OneToMany(() => CommentEntity, (comment) => comment.course)
  comments: CommentEntity[]

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[]
}
