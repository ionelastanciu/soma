import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../core/home.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  // --- FRASE DEL DÍA ---
  fraseDelDia: string | null = null;
  cargandoFrase = false;
  errorFrase = false;

  // --- CLIMA ---
  clima: { temp: number; descripcion: string } | null = null;
  cargandoClima = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.cargarFraseDelDia();
    this.cargarClima();
  }

  // ===============================
  // 🌟 FRASE DEL DÍA (API + traducción)
  // ===============================
  cargarFraseDelDia(): void {
    this.cargandoFrase = true;
    this.errorFrase = false;

    this.homeService.getFraseMotivacional().subscribe({
      next: (fraseTraducida) => {
        this.fraseDelDia = fraseTraducida;
        this.cargandoFrase = false;
      },
      error: () => {
        this.errorFrase = true;
        this.cargandoFrase = false;
      }
    });
  }

  // ===============================
  // 🌤 CLIMA REAL (geolocalización opcional)
  // ===============================
  cargarClima(): void {
    this.cargandoClima = true;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        // Si el usuario permite la ubicación:
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          this.homeService.getClimaReal(lat, lon).subscribe({
            next: (clima) => {
              this.clima = clima;
              this.cargandoClima = false;
            },
            error: () => {
              this.clima = { temp: 18, descripcion: "Clima no disponible" };
              this.cargandoClima = false;
            }
          });
        },

        // Si el usuario NO permite la ubicación:
        () => {
          this.clima = { temp: 18, descripcion: "Ubicación no otorgada" };
          this.cargandoClima = false;
        }
      );

    } else {
      // Navegador no compatible
      this.clima = { temp: 18, descripcion: "Geolocalización no disponible" };
      this.cargandoClima = false;
    }
  }
}
