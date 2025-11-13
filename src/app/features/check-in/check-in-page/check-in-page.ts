import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-check-in-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, DatePipe],
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

  historial: { estado: string; fecha: Date }[] = [];

  registrar() {
    if (!this.estadoActual) return;

    this.historial.unshift({
      estado: this.estadoActual,
      fecha: new Date()
    });

    this.estadoActual = '';
  }
}
