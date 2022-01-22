import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CommentEntity } from 'src/comments/entities/comment.entity'
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity'

@Entity('users')
export class UserEntity {
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

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[]

  @OneToMany(() => CommentEntity, (comment) => comment.id)
  comments: CommentEntity[]
}
