import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { JournalApiService, DiarioEntry } from '../../../core/journal-api.service';
import { ShortTextPipe } from '../../../shared/pipes/short-text.pipe';

@Component({
  selector: 'app-journal-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, DatePipe, ShortTextPipe],
  templateUrl: './journal-page.html',
  styleUrls: ['./journal-page.css'],
})
export class JournalPage implements OnInit {

  moods = [
    'Estrés', 'Ansiedad', 'Cansancio', 'Falta de sueño',
    'Desmotivación', 'Tranquilidad', 'Gratitud',
  ];

  mood = '';
  text = '';

  entries: DiarioEntry[] = [];
  showErrors = false;
  cargando = false;
  error = false;

  constructor(private api: JournalApiService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.cargando = true;
    this.api.getEntradas().subscribe({
      next: data => {
        this.entries = data.reverse();
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  addEntry(): void {
    this.showErrors = true;
    if (!this.mood || !this.text.trim()) return;

    const entry: DiarioEntry = {
      mood: this.mood,
      text: this.text.trim(),
      date: new Date().toISOString(),
      important: false
    };

    this.api.addEntrada(entry).subscribe({
      next: () => {
        this.mood = '';
        this.text = '';
        this.showErrors = false;
        this.loadEntries();
      }
    });
  }

  toggleImportant(entry: DiarioEntry): void {
    this.api.updateEntrada(entry.id!, { important: !entry.important })
      .subscribe(() => entry.important = !entry.important);
  }

  removeEntry(id: number): void {
    this.api.deleteEntrada(id).subscribe(() => {
      this.entries = this.entries.filter(e => e.id !== id);
    });
  }
}
