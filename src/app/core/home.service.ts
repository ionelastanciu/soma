import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

export interface FraseResponse {
  quote: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  /** Obtiene frase en inglés */
  getFraseMotivacional(): Observable<string> {
    return this.http.get<FraseResponse>(this.apiUrl).pipe(
      switchMap((resp) => this.traducirTexto(resp.quote))  // ← traducimos
    );
  }

  /** Traduce texto EN → ES usando MyMemory API */
  private traducirTexto(texto: string): Observable<string> {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`;

    return this.http.get<any>(url).pipe(
      map((resp) => resp.responseData.translatedText || texto)
    );
  }
  /** Consulta clima real basado en latitud y longitud */
getClimaReal(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

  return this.http.get<any>(url).pipe(
    map((data) => ({
      temp: data.current_weather.temperature,
      descripcion: this.traducirClima(data.current_weather.weathercode)
    }))
  );
}

/** Traducción simple de códigos meteorológicos → texto español */
private traducirClima(code: number): string {
  const mapa: any = {
    0: 'Cielo despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla densa',
    51: 'Llovizna ligera',
    61: 'Lluvia moderada',
    80: 'Chubascos',
    95: 'Tormenta'
  };
  return mapa[code] || 'Clima desconocido';
}

}
