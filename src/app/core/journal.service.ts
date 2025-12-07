import { Injectable } from '@angular/core';

export interface JournalEntry {
  id: number;
  date: string;  
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

  constructor() {
    this.loadFromStorage();
  }


  private loadFromStorage(): void {
    const data = localStorage.getItem('journal_entries');
    const idData = localStorage.getItem('journal_next_id');

    if (data) {
      this.entries = JSON.parse(data);
    }

    if (idData) {
      this.nextId = Number(idData);
    }
  }


  private saveToStorage(): void {
    localStorage.setItem('journal_entries', JSON.stringify(this.entries));
    localStorage.setItem('journal_next_id', this.nextId.toString());
  }

  getEntries(): JournalEntry[] {
    return [...this.entries]; 
  }

  addEntry(mood: string, text: string): void {
    const trimmed = text.trim();
    if (!mood || !trimmed) return;

    const entry: JournalEntry = {
      id: this.nextId++,
      date: new Date().toISOString(),
      mood,
      text: trimmed,
      important: false,
    };

    this.entries.unshift(entry);
    this.saveToStorage();
  }

  toggleImportant(id: number): void {
    const entry = this.entries.find(e => e.id === id);
    if (entry) {
      entry.important = !entry.important;
      this.saveToStorage();
    }
  }

  removeEntry(id: number): void {
    this.entries = this.entries.filter(e => e.id !== id);
    this.saveToStorage();
  }
}

