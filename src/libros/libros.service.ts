import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearLibroDto } from './dto/crear-libro.dto';
import { ActualizarLibroDto } from './dto/actualizar-libro.dto';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean;
}

@Injectable()
export class LibrosService {
  private libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'García Márquez', disponible: true },
    { id: 2, titulo: 'El túnel', autor: 'Sabato', disponible: true },
    { id: 3, titulo: 'Rayuela', autor: 'Cortázar', disponible: false },
  ];
  private siguienteId = 4;

  private indiceDe(id: number): number {
    const i = this.libros.findIndex((l) => l.id === id);
    if (i === -1) {
      throw new NotFoundException(`No existe el libro ${id}`);
    }
    return i;
  }

  findAll(autor?: string): Libro[] {
    if (autor) {
      return this.libros.filter((l) =>
        l.autor.toLowerCase().includes(autor.toLowerCase()),
      );
    }
    return this.libros;
  }

  findOne(id: number): Libro {
    const idx = this.indiceDe(id);
    return this.libros[idx];
  }

  create(dto: CrearLibroDto): Libro {
    const nuevoLibro: Libro = {
      id: this.siguienteId++,
      ...dto,
    };
    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  update(id: number, dto: CrearLibroDto): Libro {
    const idx = this.indiceDe(id);
    const libroActualizado: Libro = {
      id,
      ...dto,
    };
    this.libros[idx] = libroActualizado;
    return libroActualizado;
  }

  patch(id: number, dto: ActualizarLibroDto): Libro {
    const idx = this.indiceDe(id);
    this.libros[idx] = {
      ...this.libros[idx],
      ...dto,
    };
    return this.libros[idx];
  }

  remove(id: number): void {
    const idx = this.indiceDe(id);
    this.libros.splice(idx, 1);
  }
}