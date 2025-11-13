import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { JournalService, JournalEntry } from '../../../core/journal.service';

@Component({
  selector: 'app-journal-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, DatePipe],
  templateUrl: './journal-page.html',
  styleUrl: './journal-page.css'
})
export class JournalPage implements OnInit {

  moods = [
    'Estrés',
    'Ansiedad',
    'Cansancio',
    'Falta de sueño',
    'Desmotivación',
    'Tranquilidad',
    'Gratitud'
  ];

  mood: string = '';
  text: string = '';

  entries: JournalEntry[] = [];

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.refreshEntries();
  }

  private refreshEntries(): void {
    this.entries = this.journalService.getEntries();
  }

  addEntry(): void {
    this.journalService.addEntry(this.mood, this.text);

    this.mood = '';
    this.text = '';

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
