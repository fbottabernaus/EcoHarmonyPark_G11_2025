import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../entidades/actividad';
import { Horario } from '../entidades/horario';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscripcionDTO } from '../DTOs/inscripcionDTO';
import { Dia } from '../entidades/dia';
import { addDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  listaActividades: Actividad[] = []
  

  constructor(private http: HttpClient) { }

  cargarActividad(){
    let actividadesLocalStorage = localStorage.getItem("actividad")
    if (actividadesLocalStorage){
      let actList = JSON.parse(actividadesLocalStorage) as Actividad[]
      return of(this.crearObjetosActividad(actList))
    }
    else{
      return this.leerJson()
    }
  }

  crearObjetosActividad(json:Actividad[]){
    let listaAct = json.map((a: any) => Actividad.fromJSON(a));
    this.listaActividades = listaAct
    this.reiniciarFechas()
    return this.listaActividades
  }

  leerJson(){
    return this.http.get<Actividad[]>('/assets/actividades.json').pipe(map((res)=>{
      localStorage.setItem('actividad', JSON.stringify(res));
      return this.crearObjetosActividad(res)
    }
  ))}
  
  reducirCupos(inscripcion: InscripcionDTO) {
    console.log(JSON.stringify(inscripcion))
    for (let act of this.listaActividades){
      if (act.id === inscripcion.actividad.id){
        for (let dia of act.dias){
          if (dia.id === inscripcion.diaElegido.id){
            for (let hor of dia.horarios){
              if (hor.id === inscripcion.horarioElegido.id){
                hor.cuposOcupados += inscripcion.participantes.length
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
    this.guardarListaActividad()
  }

  guardarListaActividad(){
    localStorage.setItem('actividad', JSON.stringify(this.listaActividades));
  }
  
  actualizarHorarios() {
    let nuevoDia = new Dia()
    console.log(nuevoDia)
    for (let act of this.listaActividades){
      for (let dia of act.dias){
          dia.horarios = nuevoDia.horarios
      }
    }
    this.guardarListaActividad()
  }

  reiniciarFechas(){
    let nuevoDia = new Date()
    for (let i = 0; i < 4; i++){
      let act = this.listaActividades[i]  
      for (let j = 0; j < 30; j++){

          
          act.dias[j].fecha = addDays(nuevoDia, j)
       }
    }
  }
}
