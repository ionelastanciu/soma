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

  showErrors = false;

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.refreshEntries();
  }

  private refreshEntries(): void {
    this.entries = this.journalService.getEntries();
  }

  addEntry(): void {
    this.showErrors = true;

    if (!this.mood || !this.text.trim()) {
      return;
    }

    this.journalService.addEntry(this.mood, this.text.trim());

    this.mood = '';
    this.text = '';
    this.showErrors = false;
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
