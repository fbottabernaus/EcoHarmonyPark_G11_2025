import { Injectable } from '@angular/core';
import { InscripcionDTO } from '../DTOs/inscripcionDTO';
import { ActividadService } from './actividad.service';
import { CorreoService } from './correo.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  constructor(private actividadServicio: ActividadService,
    private correoServicio: CorreoService
  ) { }

  registrarInscripcion(inscripcion: InscripcionDTO) {
    console.log("Reduciendo cupos...")
    this.actividadServicio.reducirCupos(inscripcion)
    console.log("Generando correo...")
    this.correoServicio.generarCorreo(inscripcion)
  }
}
