import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspirationService {

  private apiUrl = 'https://zenquotes.io/api/random';

  constructor(private http: HttpClient) {}

  getPhrase(): Observable<{ quote: string; author: string }> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(res => ({
        quote: res[0].q,
        author: res[0].a
      }))
    );
  }
}

