import { Injectable } from '@angular/core';
import { addDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  test_comprar_entradas_success(){
    this.test_validar_fecha_success()
    this.test_validar_cant_entradas_success()
  }

  test_validar_fecha_success(){
    let fechaActual = new Date(2025, 5, 15)
    let fechaVisita = new Date(2025, 5, 18)

    assert.equals(this.validar_fecha(fechaActual, fechaVisita), true)
  }

  test_validar_cant_entradas_success(){
    let cantEntradas = 3

    assert.equals(this.validar_cant_entradas(cantEntradas), true)
  }

  validar_cant_entradas(cantEntradas:number){
    return (cantEntradas>0) && (cantEntradas<=10)
  }

  
  validar_fecha(fechaActual:Date, fechaVisita:Date){
    if (fechaVisita > addDays(fechaActual, 30)){
      return false
    }
    if (fechaVisita > fechaActual){
      return true
    }
    else{
      return false
    }
  }


  //JSET para poder usar el assert
}
