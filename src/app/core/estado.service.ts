import { Injectable } from '@angular/core';

export interface EstadoEmocional {
  estado: string;
  nota?: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private ultimoEstado: EstadoEmocional | null = null;

  guardarEstado(estado: EstadoEmocional) {
    this.ultimoEstado = estado;
  }

  obtenerEstado(): EstadoEmocional | null {
    return this.ultimoEstado;
  }
}
