import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../core/home.service';
import { ClimateService, WeatherInfo } from '../../../core/climate.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  fraseDelDia: string | null = null;
  cargandoFrase = false;
  errorFrase = false;

  weather: WeatherInfo | null = null;
  cargandoClima = false;

  constructor(
    private homeService: HomeService,
    private climate: ClimateService
  ) {}

  ngOnInit(): void {
    this.cargarFraseDelDia();
    this.cargarClima();
    setInterval(() => this.cargarClima(), 10 * 60 * 1000);
  }

  cargarFraseDelDia(): void {
    this.cargandoFrase = true;
    this.errorFrase = false;

    this.homeService.getFraseMotivacional().subscribe({
      next: frase => {
        this.fraseDelDia = frase;
        this.cargandoFrase = false;
      },
      error: () => {
        this.errorFrase = true;
        this.cargandoFrase = false;
      }
    });
  }

  cargarClima(): void {
    this.cargandoClima = true;

    if (!('geolocation' in navigator)) {
      this.weather = {
        temp: 18,
        desc: 'Geolocalización no disponible',
        icon: '/assets/weather/partly.svg'
      };
      this.cargandoClima = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        this.climate.getWeatherData(lat, lon).subscribe({
          next: (w) => {
            this.weather = w;
            this.cargandoClima = false;
          },
          error: () => {
            this.weather = {
              temp: 18,
              desc: 'Clima no disponible',
              icon: '/assets/weather/partly.svg'
            };
            this.cargandoClima = false;
          }
        });
      },
      () => {
        this.weather = {
          temp: 18,
          desc: 'Ubicación no otorgada',
          icon: '/assets/weather/partly.svg'
        };
        this.cargandoClima = false;
      }
    );
  }
}
