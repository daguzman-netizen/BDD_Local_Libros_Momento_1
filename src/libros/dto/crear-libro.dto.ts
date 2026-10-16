import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CrearLibroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsBoolean()
  disponible: boolean;
}