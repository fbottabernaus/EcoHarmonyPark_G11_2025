import { Injectable, OnInit } from '@angular/core';
import { InscripcionDTO } from '../DTOs/inscripcionDTO';
import { ActividadService } from './actividad.service';
import { CorreoService } from './correo.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  listaInscripciones: InscripcionDTO[] = []

  constructor(private actividadServicio: ActividadService,
    private correoServicio: CorreoService
  ) { }


  registrarInscripcion(inscripcion: InscripcionDTO) {
    this.actividadServicio.reducirCupos(inscripcion)
    this.enlistarInscripcion(inscripcion)
    this.persistirInscripcion()
    this.correoServicio.generarCorreo(inscripcion)
    this.leerInscripciones()
    return this.listaInscripciones.length
  }
  
  leerInscripciones(){
    let datos = localStorage.getItem('inscripciones');

    if (datos){
      let datosObj :InscripcionDTO[]  = JSON.parse(datos)
      this.listaInscripciones = datosObj
    }
  }

  enlistarInscripcion(inscripcion: InscripcionDTO){

    inscripcion.id = this.listaInscripciones.length
    this.listaInscripciones.push(inscripcion)
  }

  persistirInscripcion(){
    localStorage.setItem('inscripciones', JSON.stringify(this.listaInscripciones));
  }

  obtenerInscripcion(id: string | null): InscripcionDTO | null | undefined{
  this.leerInscripciones()
  let numero: number;
  if (id) {
    numero = parseInt(id, 10);  // Convierte el string a número en base 10
    return this.listaInscripciones.at(numero);  // Obtén la inscripción usando el índice
  }
  // Retorna un valor por defecto si el id es null o vacío, si es necesario
  return null;
  }
}
