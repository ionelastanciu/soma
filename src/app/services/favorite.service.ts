import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LikedItem {
  id?: number;          // Lo pone json-server
  readingId: number;    // ID de la lectura marcada como favorita
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/liked';

  constructor(private http: HttpClient) {}

  /** Guardar favorito */
  addFavorite(item: LikedItem): Observable<LikedItem> {
    return this.http.post<LikedItem>(this.apiUrl, item);
  }

  /** Eliminar favorito */
  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Obtener la lista de favoritos */
  getFavorites(): Observable<LikedItem[]> {
    return this.http.get<LikedItem[]>(this.apiUrl);
  }
}
