import { Routes } from '@angular/router';
import { InscripcionComponent } from './componentes/inscripcion/inscripcion.component';
import { VisualizarInscripcionComponent } from './componentes/visualizar-inscripcion/visualizar-inscripcion.component';

export const routes: Routes = [
    {path: '', component:InscripcionComponent},
    {path: 'visualizar/:id', component:VisualizarInscripcionComponent}
];
