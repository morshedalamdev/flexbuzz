import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NoteService {

     public async create(noteDto: CreateNoteDto){

          return "Note created successfully";
     }
}
