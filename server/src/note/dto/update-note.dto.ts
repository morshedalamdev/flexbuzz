import { PartialType } from "@nestjs/mapped-types";
import { CreateNoteDto } from "./create-note.dto";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
