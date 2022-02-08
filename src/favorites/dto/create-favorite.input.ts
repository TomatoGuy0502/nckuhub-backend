import { IsString, IsNotEmpty } from 'class-validator'

export class CreateFavoriteInput {
  @IsString()
  @IsNotEmpty()
  readonly courseId: string
}
