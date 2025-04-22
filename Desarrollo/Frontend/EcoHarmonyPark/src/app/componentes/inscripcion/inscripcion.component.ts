import { Component, OnInit, inject, model } from '@angular/core';
import { ActividadService } from '../../servicios/actividad.service';
import { Actividad } from '../../entidades/actividad';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Horario } from '../../entidades/horario';


import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';

import {MatButtonModule} from '@angular/material/button';
import { ParticipantesComponent } from '../participantes/participantes.component';
import { Participante } from '../../entidades/participante';
import { InscripcionDTO } from '../../DTOs/inscripcionDTO';
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../../servicios/inscripcion.service';
import { Dia } from '../../entidades/dia';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';



import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


export interface DialogData {
  nombreActividad: string,
  tyc: string
}

export interface DataParticipante{
  vestimenta: boolean,
  titulo: string,
  cuposDisponibles?: number,
  participantes: Participante[],
  cantParticipantes: number
}

const formatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',   // Nombre completo del día
  month: 'long',     // Nombre completo del mes
  day: 'numeric',    // Día del mes
});

@Component({
  selector: 'app-inscripcion',
  providers: [provideNativeDateAdapter()],
  imports: [ CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatCheckboxModule, MatDialogModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule],
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css'
})

export class InscripcionComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public actividades!: Actividad[]
  public checkTyC = false;
  public actSeleccionada!: Actividad;
  public diaSeleccionado!: Dia | null;
  public horSeleccionado!: Horario | null;
  public participantesSeleccionados: Participante[] = [];

  selected: Date|null = new Date(); // Fecha seleccionada por defecto
  selectedString = "Seleccionar una fecha"
  
  readonly minDate = new Date(2025, 3, 22);
  readonly maxDate = new Date(2025, 4, 22);

  qrData="Inscripcion exitosa"

  constructor(private actividadServicio: ActividadService,
    private inscripcionServicio: InscripcionService
  ) { }

  ngOnInit(): void {
    this.actividadServicio.cargarActividad().subscribe((res: Actividad[])=>{
      this.actividades = res
      console.log(this.actividades)
    })
  }

  seleccionActividad(){
    this.selected = null
    this.selectedString = "Seleccionar una fecha"
    this.diaSeleccionado = null;
    this.horSeleccionado = null
    this.participantesSeleccionados = []
    this.checkTyC = false
  }

  seleccionDia(fecha:Date|null){
    this.horSeleccionado = null
    this.participantesSeleccionados = []
    this.checkTyC = false

    if (fecha){
      this.selected = fecha
      this.selectedString = formatter.format(fecha);

      for (let dia of this.actSeleccionada.dias){
        if (dia.fecha.toDateString() === fecha.toDateString()){
          this.diaSeleccionado = dia
          break;
        }
      }
    }
  }
  filtrarDias = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 2 && day !== 4;
  };
  getHorariosDisponibles() {
    return this.diaSeleccionado?.horarios?.filter(h => !h.noCupos()) || [];
  }

  seleccionHorario(){
    this.participantesSeleccionados = []
    this.checkTyC = false
  }

  participantesButton(){
    let dataParticipantes:DataParticipante = {
      titulo: this.actSeleccionada.nombre + " - " + this.horSeleccionado?.horaInicio,
      vestimenta: this.actSeleccionada.vestimenta,
      cuposDisponibles: this.horSeleccionado?.cuposDisponibles(),
      participantes: this.participantesSeleccionados,
      cantParticipantes: this.participantesSeleccionados.length
    }

    const dialogRef = this.dialog.open(ParticipantesComponent,{
      width:"390px",
      disableClose: true,
      panelClass: 'custom-container',
      data: dataParticipantes}
    );
    
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.participantesSeleccionados = result
        this.checkTyC = false
      }
      
      console.log(result)
    });
  }
  existenParticipantes(){
    return this.participantesSeleccionados.length > 0
  }

  clickTyc(){
    let dataTyc:DialogData = {
      nombreActividad: this.actSeleccionada.nombre,
      tyc: this.actSeleccionada.tyc
    }

    const dialogRef = this.dialog.open(TerminosCondicionesComponent,{
      data: dataTyc}
    );
    
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.checkTyC = true
      }
      else if(result === false){
        this.checkTyC = false
      }
    });
  }

  inscribirButton(){
    if (!this.actSeleccionada){
      alert("Debe seleccionar una actividad")
      return
    }
    if (!this.diaSeleccionado){
      alert("Debe seleccionar un dia")
      return
    }
    if (!this.horSeleccionado){
      alert("Debe seleccionar un horario")
      return
    }
    if (this.participantesSeleccionados.length <= 0){
      alert("Debe haber algún participante")
      return
    }
    if (!this.checkTyC){
      alert("Debe aceptar los términos y condiciones")
      return
    }

    let inscripcion = new InscripcionDTO(this.actSeleccionada, this.diaSeleccionado, this.horSeleccionado, this.participantesSeleccionados)
    this.inscripcionServicio.registrarInscripcion(inscripcion)
    alert("Se pudo realizar la inscripción correctamente.");
    //location.reload()
  }
  public enviarCorreo(form: any) {
    emailjs.send('service_ft2t10w', 'template_k7iu6mq', form.value, 'a8mVOawSQcFYnQ1wA')
      .then((response: EmailJSResponseStatus) => {
        alert('✅ Inscripción enviada correctamente');
      }, (error) => {
        console.error('❌ Error al enviar', error);
        alert('Hubo un error al enviar el formulario.');
      });
  }

  asd(){
    this.actividadServicio.actualizarHorarios()
  }
}
