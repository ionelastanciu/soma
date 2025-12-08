import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favorito {
  id?: number;
  readingId: number;   
}

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private apiUrl = 'http://localhost:3000/favoritos';

  constructor(private http: HttpClient) {}

  getFavoritos(): Observable<Favorito[]> {
    return this.http.get<Favorito[]>(this.apiUrl);
  }

  addFavorito(readingId: number): Observable<Favorito> {
    return this.http.post<Favorito>(this.apiUrl, { readingId });
  }

  removeFavorito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
