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

  // Lista de estados disponibles
  estados = [
    'Estrés',
    'Ansiedad',
    'Cansancio',
    'Falta de sueño',
    'Desmotivación',
    'Tranquilidad',
    'Gratitud'
  ];

  // Modelo del formulario
  estadoActual: string = '';
  nota: string = '';

  mostrarError = false; // <-- Para controlar el mensaje al pulsar "Registrar"

  // Historial de registros
  historial: { estado: string; nota?: string; fecha: Date }[] = [];

  registrar(form: any) {
    this.mostrarError = false; // reset del error

    // Si no ha elegido estado, mostramos error al usuario
    if (!this.estadoActual) {
      this.mostrarError = true;
      return;
    }

    // Guardamos entrada
    this.historial.unshift({
      estado: this.estadoActual,
      nota: this.nota,
      fecha: new Date()
    });

    // Reset visual y de validación
    form.resetForm();

    // Aseguramos que no aparezca error tras reset
    this.mostrarError = false;
  }
}
