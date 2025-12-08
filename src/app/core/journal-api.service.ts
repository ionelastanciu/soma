import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DiarioEntry {
  id?: number;
  mood: string;
  text: string;
  date: string;
  important: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class JournalApiService {

  private apiUrl = 'http://localhost:3000/diario';

  constructor(private http: HttpClient) {}

  getEntradas(): Observable<DiarioEntry[]> {
    return this.http.get<DiarioEntry[]>(this.apiUrl);
  }

  addEntrada(entry: DiarioEntry): Observable<DiarioEntry> {
    return this.http.post<DiarioEntry>(this.apiUrl, entry);
  }

  updateEntrada(id: number, entry: Partial<DiarioEntry>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, entry);
  }

  deleteEntrada(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
