import {IsNotEmpty} from 'class-validator'
export class AuthEntity {
    @IsNotEmpty()
    NIU?: string
    @IsNotEmpty()
    password?: string
  }