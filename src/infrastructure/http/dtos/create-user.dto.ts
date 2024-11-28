import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    first_name: string;

    @IsDefined()
    @IsString()
    last_name: string;
}
