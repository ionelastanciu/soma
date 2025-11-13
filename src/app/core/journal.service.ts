import { Injectable } from '@angular/core';

export interface JournalEntry {
  id: number;
  date: Date;
  mood: string;
  text: string;
  important: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private entries: JournalEntry[] = [];
  private nextId = 1;

  getEntries(): JournalEntry[] {
    return [...this.entries];
  }

  addEntry(mood: string, text: string): void {
    const trimmed = text.trim();
    if (!mood || !trimmed) return;

    const entry: JournalEntry = {
      id: this.nextId++,
      date: new Date(),
      mood,
      text: trimmed,
      important: false,
    };

    this.entries.unshift(entry);
  }

  toggleImportant(id: number): void {
    const entry = this.entries.find(e => e.id === id);
    if (entry) {
      entry.important = !entry.important;
    }
  }

  removeEntry(id: number): void {
    this.entries = this.entries.filter(e => e.id !== id);
  }
}
