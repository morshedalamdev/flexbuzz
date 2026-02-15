import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CommentDto {
     @IsUUID()
     @IsNotEmpty()
     id: string;

     @IsString()
     @IsNotEmpty()
     content: string;
}