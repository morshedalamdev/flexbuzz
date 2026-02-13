import { IsNotEmpty, IsUUID } from "class-validator";

export class LikeDto {
  @IsNotEmpty()
  @IsUUID()
  noteId: string;
}
