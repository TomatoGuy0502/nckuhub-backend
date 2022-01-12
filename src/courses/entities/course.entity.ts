import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Department } from '../../departments/entities/department.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { Favorite } from 'src/favorites/entities/favorite.entity'

@Entity('courses')
export class Course {
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

  @ManyToOne(() => Department, (department) => department.course)
  @JoinColumn()
  department: Department

  @OneToMany(() => Comment, (comment) => comment.course)
  comments: Comment[]

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[]
}
