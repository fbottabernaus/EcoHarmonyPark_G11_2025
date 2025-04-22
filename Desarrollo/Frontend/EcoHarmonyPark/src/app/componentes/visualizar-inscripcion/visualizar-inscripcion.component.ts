import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionService } from '../../servicios/inscripcion.service';
import { InscripcionDTO } from '../../DTOs/inscripcionDTO';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-visualizar-inscripcion',
  imports: [MatButtonModule],
  templateUrl: './visualizar-inscripcion.component.html',
  styleUrl: './visualizar-inscripcion.component.css'
})
export class VisualizarInscripcionComponent {
  id: string | null = null; // O el tipo adecuado según tu caso
  inscripcion!: InscripcionDTO |null | undefined
  inscripcionFinal!: InscripcionDTO
  constructor(private route: ActivatedRoute,
    private inscripcionServicio: InscripcionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.inscripcion = this.inscripcionServicio.obtenerInscripcion(this.id)
    if (this.inscripcion){
      this.inscripcionFinal = this.inscripcion 
    }
    console.log(this.inscripcion)
    // Aquí puedes hacer algo con el `id`, como cargar los datos
  }

  volverInscribir(){
    this.router.navigate(['/']);
  }
}

