import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DataParticipante } from '../inscripcion/inscripcion.component';
import { Participante } from '../../entidades/participante';

@Component({
  selector: 'app-participantes',
  imports: [MatSelectModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, 
    MatCheckboxModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.css'
})
export class ParticipantesComponent implements OnInit{
  data:DataParticipante = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ParticipantesComponent>);

  cantParticipantes!:number
  participantes: Participante[] = []

  ngOnInit(): void {
    if (this.data.cantParticipantes){  
      this.cantParticipantes = this.data.cantParticipantes
    }
    this.participantes = this.data.participantes
  }

  validarMaximo(){
    setTimeout(() => {
      if (this.data.cuposDisponibles){//Hace falta pq podria ser null
        if (this.cantParticipantes > this.data.cuposDisponibles) {
          this.cantParticipantes = this.data.cuposDisponibles;
        }
        if (this.cantParticipantes < 0) {
          this.cantParticipantes = 0;
        }
        this.crearParticipantes()
      }
    });
  }
  soloLetras(event: KeyboardEvent): void {
    const letra = event.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
  
    if (!regex.test(letra)) {
      event.preventDefault();
    }
  }
  validarDni(target: any, partic: any): void {
    setTimeout(() => {
      let valor = target.value;
    
      // Si tiene más de 8 caracteres, lo cortamos
      if (valor.length > 8) {
        valor = valor.substring(0, 8);
        target.value = valor;
      }
    })
  }
  
  validarEdad(entrada:any){
    setTimeout(() => {
      if (entrada.value){//Hace falta pq podria ser null
        if (entrada.value > 100) {
          entrada.value = 100;
        }
        if (entrada.value < 0) {
          entrada.value = 0;
        }
      }
    });
  }

  evitarDecimal(event: KeyboardEvent): void {
    if (event.key === '.' || event.key === ',' || event.key === 'e' || event.key === '-') {
      event.preventDefault();
    }
  }

  crearParticipantes(){
    //Si hay que agregar participantes:
    if (this.cantParticipantes > this.participantes.length){
      //Agrega participantes desde el último, hasta la nueva cantidad 
      for (let i = this.participantes.length+1; i <= this.cantParticipantes; i++){
        //i empieza con el index del ultimo participantes, termina en la nueva cantidad 
        this.participantes.push(new Participante(i)) 
      }
    }
    //Si hay que quitar participantes:
    else{
      //Calcula cuantos hay que quitar
      let cantaAQuitar = this.participantes.length - this.cantParticipantes
      for (let i = 0; i < cantaAQuitar; i++){
        this.participantes.pop()
      }
    }
  }

  rechazar(){
    this.dialogRef.close([])
  }

  aceptar(){
    for (let partic of this.participantes){
      if(partic.tieneNulls(this.data.vestimenta)){
        alert("Por favor, complete los datos del participante " + partic.id)
        return
      }
      if(partic.dni < 999999){
        alert("Por favor, ingrese un DNI válido para el participante " + partic.id)
        return
      }
    }

    this.dialogRef.close(this.participantes);
  }
}
