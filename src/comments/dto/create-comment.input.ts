import { IsString, Min, Max, IsNotEmpty } from 'class-validator'

export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  readonly text: string

  @Min(0)
  @Max(10)
  @IsNotEmpty()
  readonly got: number

  @Min(0)
  @Max(10)
  @IsNotEmpty()
  readonly sweet: number

  @Min(0)
  @Max(10)
  @IsNotEmpty()
  readonly cold: number

  @IsString()
  @IsNotEmpty()
  readonly courseId: string

  @IsString()
  @IsNotEmpty()
  readonly userId: string
}
