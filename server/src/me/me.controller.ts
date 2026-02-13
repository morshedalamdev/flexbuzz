import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { MeService } from './me.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('me')
export class MeController {
  constructor(
    private readonly meService: MeService,
  ) {}

  @Get()
  public GetCurrent() {
    return this.meService.find();
  }

  @Patch()
  public UpdateCurrent(@Body() updateDto: UpdateUserDto) {
    return this.meService.update(updateDto);
  }

  @Delete()
  public DeleteCurrent() {
    return this.meService.delete();
  }}
