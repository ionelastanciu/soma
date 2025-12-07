import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe, NgClass } from '@angular/common';
import { EstadoService } from '../../../core/estado.service';  

@Component({
  selector: 'app-check-in-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, DatePipe],
  templateUrl: './check-in-page.html',
  styleUrls: ['./check-in-page.css']
})
export class CheckInPage {

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

  historial: { estado: string; nota?: string; fecha: Date }[] = [];

  constructor(private estadoService: EstadoService) {}

  registrar(form: any) {
    this.mostrarError = false;

    if (!this.estadoActual) {
      this.mostrarError = true;
      return;
    }

    this.historial.unshift({
      estado: this.estadoActual,
      nota: this.nota,
      fecha: new Date()
    });

    this.estadoService.guardarEstado({
      estado: this.estadoActual,
      nota: this.nota,
      fecha: new Date().toISOString()
    });

    form.resetForm();

    this.mostrarError = false;
  }
}
