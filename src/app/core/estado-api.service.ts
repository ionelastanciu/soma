import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstadoRegistro {
  id?: number;      
  estado: string;
  nota?: string;
  fecha: string;   
}

@Injectable({
  providedIn: 'root'
})
export class EstadoApiService {

  private apiUrl = 'http://localhost:3000/estados';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<EstadoRegistro[]> {
    return this.http.get<EstadoRegistro[]>(this.apiUrl);
  }

  addEstado(estado: EstadoRegistro): Observable<EstadoRegistro> {
    return this.http.post<EstadoRegistro>(this.apiUrl, estado);
  }
}
