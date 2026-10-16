import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Res,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import type { Response } from 'express';
import { LibrosService } from './libros.service';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { ActualizarLibroDto } from './dto/actualizar-libro.dto';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  listar(@Query('autor') autor?: string) {
    return this.librosService.findAll(autor);
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.findOne(id);
  }

  @Post()
  crear(@Body() cuerpo: CrearLibroDto, @Res({ passthrough: true }) res: Response) {
    const nuevo = this.librosService.create(cuerpo);
    res.setHeader('Location', `/libros/${nuevo.id}`);
    return nuevo;
  }

  @Put(':id')
  reemplazar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cuerpo: CrearLibroDto,
  ) {
    return this.librosService.update(id, cuerpo);
  }

  @Patch(':id')
  modificar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: ActualizarLibroDto,
  ) {
    return this.librosService.patch(id, cambios);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    this.librosService.remove(id);
  }
}