import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface BookRecommendation {
  id: string;
  titulo: string;
  autor: string;
  portada: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  buscarLibros(termino: string): Observable<BookRecommendation[]> {
    const params = new HttpParams()
      .set('q', termino)
      .set('limit', 5);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((resp) =>
        (resp.docs || []).map((d: any, index: number) => ({
          id: d.key ?? `book-${index}`,
          titulo: d.title ?? 'Título desconocido',
          autor: d.author_name?.[0] ?? 'Autor desconocido',
          portada: d.cover_i
            ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
            : null,
        }))
      )
    );
  }
}
