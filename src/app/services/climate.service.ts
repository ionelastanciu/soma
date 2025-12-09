import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface WeatherInfo {
  temp: number;
  desc: string;  
  icon: string;  
}

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<string> {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    return this.http.get<any>(url).pipe(
      map(res => {
        const temp = res.current_weather.temperature;
        const wind = res.current_weather.windspeed;

        if (temp < 10) return 'Hace frío afuera: escucha a tu cuerpo y busca calor interior.';
        if (temp > 28) return 'El calor puede agobiar: respira despacio y busca sombra.';
        if (wind > 30) return 'Hay viento fuerte: inhala profundo y suelta tensión.';
        return 'El clima está estable: un buen momento para salir a caminar despacio.';
      })
    );
  }

  getWeatherData(lat: number, lon: number): Observable<WeatherInfo> {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    return this.http.get<any>(url).pipe(
      map(res => {
        const temp = res.current_weather.temperature;
        const code = res.current_weather.weathercode;

        const desc = this.getWeatherDescription(code);
        const icon = this.getWeatherIcon(desc);

        return { temp, desc, icon };
      })
    );
  }

  private getWeatherDescription(code: number): string {
    if ([0].includes(code)) return 'Despejado';
    if ([1, 2, 3].includes(code)) return 'Parcialmente nublado';
    if ([45, 48].includes(code)) return 'Niebla';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Llovizna';
    if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Lluvia';
    if ([71, 73, 75, 77].includes(code)) return 'Nieve';
    if ([95, 96, 99].includes(code)) return 'Tormenta';

    return 'Clima estable';
  }

  private getWeatherIcon(desc: string): string {
    const d = desc.toLowerCase();

    if (d.includes('torment')) return '/assets/weather/storm.svg';
    if (d.includes('lluv') || d.includes('llovi')) return '/assets/weather/rain.svg';
    if (d.includes('nieve')) return '/assets/weather/snow.svg';
    if (d.includes('nublado') || d.includes('parcial')) return '/assets/weather/cloudy.svg';
    if (d.includes('despejado')) return '/assets/weather/sunny.svg';

    return '/assets/weather/partly.svg';
  }
}
