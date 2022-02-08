import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  readonly facebookId: string

  @IsString()
  @IsNotEmpty()
  readonly displayName: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string
}
