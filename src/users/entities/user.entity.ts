import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Comment } from 'src/comments/entities/comment.entity'
import { Favorite } from 'src/favorites/entities/favorite.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  displayName: string

  @Column({
    unique: true
  })
  email: string

  @Column({
    default: 10
  })
  points: number

  @Column()
  facebookId: string

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[]

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[]
}
