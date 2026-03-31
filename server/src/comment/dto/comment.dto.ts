import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CommentDto {
     @IsUUID()
     @IsNotEmpty()
     postId: string;

     @IsString()
     @IsNotEmpty()
     content: string;
}