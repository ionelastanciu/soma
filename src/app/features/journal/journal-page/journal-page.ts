import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { JournalService, JournalEntry } from '../../../core/journal.service';
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
    'Estrés',
    'Ansiedad',
    'Cansancio',
    'Falta de sueño',
    'Desmotivación',
    'Tranquilidad',
    'Gratitud',
  ];

  mood: string = '';
  text: string = '';

  entries: JournalEntry[] = [];

  // controla si mostramos mensajes de error
  showErrors = false;

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.refreshEntries();
  }

  private refreshEntries(): void {
    this.entries = this.journalService.getEntries();
  }

  addEntry(): void {
    // el usuario ha intentado enviar
    this.showErrors = true;

    if (!this.mood || !this.text.trim()) {
      // hay errores → solo mostramos mensajes, no guardamos
      return;
    }

    // si llegamos aquí, todo OK
    this.journalService.addEntry(this.mood, this.text.trim());

    // limpiamos formulario
    this.mood = '';
    this.text = '';
    this.showErrors = false; // ocultamos errores hasta el siguiente intento

    this.refreshEntries();
  }

  toggleImportant(entry: JournalEntry): void {
    this.journalService.toggleImportant(entry.id);
    this.refreshEntries();
  }

  removeEntry(id: number): void {
    this.journalService.removeEntry(id);
    this.refreshEntries();
  }
}
