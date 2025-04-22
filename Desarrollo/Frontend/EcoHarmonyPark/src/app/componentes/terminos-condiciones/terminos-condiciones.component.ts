import { Component, inject } from '@angular/core';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';


import { DialogData } from '../inscripcion/inscripcion.component';

@Component({
  selector: 'app-terminos-condiciones',
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, MatButtonModule],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent {
  data:DialogData = inject(MAT_DIALOG_DATA);

}
