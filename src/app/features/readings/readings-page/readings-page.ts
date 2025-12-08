import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksService, BookRecommendation } from '../../../core/books.service';

interface Reading {
  id: number;
  title: string;
  author: string;
  moodTag: string;
  minutes: number;
  favorited: boolean;
}

@Component({
  selector: 'app-readings-page',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './readings-page.html',
  styleUrl: './readings-page.css',
})
export class ReadingsPage {
  title = 'Lecturas y citas';

  // Buscador de lecturas locales
  search = '';

  readings: Reading[] = [
    {
      id: 1,
      title: 'Respira: contar hasta cuatro',
      author: 'SOMA',
      moodTag: 'Estrés',
      minutes: 3,
      favorited: false,
    },
    {
      id: 2,
      title: 'Aceptar lo que no controlo',
      author: 'Inspirado en estoicismo',
      moodTag: 'Ansiedad',
      minutes: 4,
      favorited: false,
    },
    {
      id: 3,
      title: 'Una cosa cada vez',
      author: 'Mindfulness cotidiano',
      moodTag: 'Cansancio',
      minutes: 2,
      favorited: false,
    },
    {
      id: 4,
      title: 'Nada dura para siempre',
      author: 'Memento mori suave',
      moodTag: 'Tristeza',
      minutes: 5,
      favorited: false,
    },
  ];

  // ⭐ Favoritos: ahora pasamos el objeto, no el id
  toggleFavorite(r: Reading) {
    r.favorited = !r.favorited;
  }

  get filteredReadings(): Reading[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.readings;
    return this.readings.filter((r) =>
      r.title.toLowerCase().includes(term) ||
      r.author.toLowerCase().includes(term) ||
      r.moodTag.toLowerCase().includes(term)
    );
  }

  // 🔎 Libros recomendados (API)
  searchBooks = '';
  libros: BookRecommendation[] = [];
  cargando = false;
  error = false;

  constructor(private booksService: BooksService) {}

  buscarLibros(): void {
    const term = this.searchBooks.trim();

    if (!term) {
      this.libros = [];
      return;
    }

    this.cargando = true;
    this.error = false;

    this.booksService.buscarLibros(term).subscribe({
      next: (books) => {
        this.libros = books;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      },
    });
  }

  guardarLibro(libro: BookRecommendation): void {
    // Aquí podrías guardarlo en localStorage, JSON-server, etc.
    console.log('Libro guardado (por ahora solo en consola):', libro);
    alert(`Libro guardado: ${libro.titulo}`);
  }
}
