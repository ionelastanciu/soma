import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { EstadoApiService } from '../../../services/estado-api.service';

@Component({
  selector: 'app-check-in-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, DatePipe],
  templateUrl: './check-in-page.html',
  styleUrls: ['./check-in-page.css']
})
export class CheckInPage implements OnInit {

  estados = [
    'Estrés',
    'Ansiedad',
    'Cansancio',
    'Falta de sueño',
    'Desmotivación',
    'Tranquilidad',
    'Gratitud'
  ];

  estadoActual: string = '';
  nota: string = '';
  mostrarError = false;

  historial: any[] = [];
  cargando = false;
  errorCarga = false;

  constructor(private estadoApi: EstadoApiService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.cargando = true;
    this.estadoApi.getEstados().subscribe({
      next: data => {
        this.historial = data.reverse();
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = true;
        this.cargando = false;
      }
    });
  }

  registrar(form: any) {
    if (!this.estadoActual) {
      this.mostrarError = true;
      return;
    }

    const nuevoEstado = {
      estado: this.estadoActual,
      nota: this.nota,
      fecha: new Date().toISOString()
    };

    this.estadoApi.addEstado(nuevoEstado).subscribe({
      next: () => {
        this.cargarHistorial();
        form.resetForm();
      },
      error: () => {
        alert("No se pudo guardar el estado.");
      }
    });
  }
}
