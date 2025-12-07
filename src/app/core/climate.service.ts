import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<string> {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    return this.http.get<any>(url).pipe(
      map(res => {
        const temp = res.current_weather.temperature;
        const wind = res.current_weather.windspeed;

        if (temp < 10) return "Hace frío afuera: escucha a tu cuerpo y busca calor interior.";
        if (temp > 28) return "El calor puede agobiar: respira despacio y busca sombra.";
        if (wind > 30) return "Hay viento fuerte: inhala profundo y suelta tensión.";
        return "El clima está estable: un buen momento para salir a caminar despacio.";
      })
    );
  }
}
