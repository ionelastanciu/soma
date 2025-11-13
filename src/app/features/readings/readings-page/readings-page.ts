import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Reading {
  id: number;
  title: string;
  author: string;
  moodTag: string;   // para qué estado encaja mejor
  minutes: number;   // tiempo de lectura
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

  // filtro simple por texto
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
      favorited: true,
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

  toggleFavorite(id: number) {
    const item = this.readings.find(r => r.id === id);
    if (item) item.favorited = !item.favorited;
  }

  get filteredReadings(): Reading[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.readings;
    return this.readings.filter(r =>
      r.title.toLowerCase().includes(term) ||
      r.author.toLowerCase().includes(term) ||
      r.moodTag.toLowerCase().includes(term)
    );
  }
}
