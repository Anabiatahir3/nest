import { IsEnum,IsString,IsNotEmpty } from "class-validator";
export class CreateDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEnum(["INTERN","ENGINEER","ADMIN"],{
        message:"Valid role required"
    })

    role:"INTERN"|"ENGINEER"|"ADMIN"
}