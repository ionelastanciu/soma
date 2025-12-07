import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface QuoteApiResponse {
  id: number;
  quote: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<{ text: string; author: string }> {
    return this.http.get<QuoteApiResponse>(this.apiUrl).pipe(
      map((res) => ({
        text: res.quote,
        author: res.author || 'Autor desconocido',
      })),
      catchError(() =>
        of({
          text: 'Aun en los días pesados, sigues siendo suficiente.',
          author: 'SOMA',
        })
      )
    );
  }
}
