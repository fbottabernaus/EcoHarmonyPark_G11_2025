import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { addDays } from 'date-fns';

//Se puede ejecutar estos tests con el comando npm run test:testservice

class Entrada{
  edad:number
  tipoEntrada:string
  fecha:Date
  formaPago:string
  
  constructor(edad:number, tipoEntrada:string,fecha:Date,formaPago:string){
    this.edad = edad
    this.tipoEntrada = tipoEntrada
    this.fecha = fecha
    this.formaPago = formaPago
  }
}

//TESTS
//Success
function test_comprar_entradas_success(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 18)
  let cantEntradas = 2
  //Se pasan 2 edades y 2 tipo de entradas, la idea es que se hagan pares 1-VIP y 100-REGULAR
  let edades = [1, 100]
  let tipoEntradas = ["VIP", "REGULAR"]
  let formaPago = "Efectivo"

  expect(comprar_entradas(fechaActual, fechaVisita, cantEntradas, edades, tipoEntradas, formaPago)).toBe("Éxito")
}

function test_validar_inputs_success(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 18)
  let cantEntradas = 2
  //Se pasan 2 edades y 2 tipo de entradas, la idea es que se hagan pares 1-VIP y 100-REGULAR
  let edades = [1, 100]
  let tipoEntradas = ["VIP", "REGULAR"]
  let formaPago = "Efectivo"

  expect(validar_inputs(fechaActual, fechaVisita, cantEntradas, edades, tipoEntradas, formaPago)).toBe(true)
}

function test_validar_fecha_success(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 18)

  expect(validar_fecha(fechaActual, fechaVisita)).toBe(true)
}

function test_validar_cant_entradas_success(){
  let cantEntradas = 3

  expect(validar_cant_entradas(cantEntradas)).toBe(true)
}

function test_validar_edades_success(){
  let cantEntradas = 2
  //Se pasan 2 edades
  let edades = [1, 100]

  expect(validar_edades(edades, cantEntradas)).toBe(true)
}

function test_validar_edad_success(){
  let edad = 18

  expect(validar_edad(edad)).toBe(true)
}

function test_validar_tipo_entradas_success(){
  let cantEntradas = 2

  //Se pasan 2 tipo de entradas
  let tipoEntradas = ["VIP", "REGULAR"]

  expect(validar_tipo_entradas(tipoEntradas, cantEntradas)).toBe(true)
}

function test_validar_tipo_entrada_success(){
  let tipoEntradas = "VIP"

  expect(validar_tipo_entrada(tipoEntradas)).toBe(true)
}

function test_validar_forma_pago_success(){
  let formaPago = "Efectivo"

  expect(validar_forma_pago(formaPago)).toBe(true)
}

function test_generar_entradas_success(){
  let fechaVisita = new Date(2025, 5, 18)
  let cantEntradas = 2
  //Se pasan 2 edades y 2 tipo de entradas, la idea es que se hagan pares 1-VIP y 100-REGULAR
  let edades = [1, 100]
  let tipoEntradas = ["VIP", "REGULAR"]
  let formaPago = "Efectivo"

  expect(generar_entradas(fechaVisita, cantEntradas, edades, tipoEntradas, formaPago)).toBeInstanceOf(Array<Entrada>)//Revisar
}

function test_calcular_total_success(){
  let fechaVisita = new Date(2025, 5, 18)
  let formaPago = "Efectivo"
  
  let entrada1 = new Entrada(1, "VIP", fechaVisita, formaPago)
  let entrada2 = new Entrada(100, "REGULAR", fechaVisita, formaPago)
  let entradas = [entrada1, entrada2] 

  expect(calcular_total(entradas)).toBe(8000)
}

function test_get_subtotal_success(){
  let fechaVisita = new Date(2025, 5, 18)
  let formaPago = "Efectivo"
  
  let entrada = new Entrada(1, "VIP", fechaVisita, formaPago)

  expect(calcular_subtotal(entrada)).toBe(5000)
}

//Comprobar fallos
function test_comprar_entradas_fecha_pasada(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 11) // fecha en el pasado
  let cantEntradas = 2
  let edades = [1, 100]
  let tipoEntradas = ["VIP", "REGULAR"]
  let formaPago = "Efectivo"

  expect(comprar_entradas(fechaActual, fechaVisita, cantEntradas, edades, tipoEntradas, formaPago))
    .toBe("Datos inválidos")
}

function test_validar_inputs_fecha_pasada(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 11) // fecha en el pasado
  let cantEntradas = 2
  let edades = [1, 100]
  let tipoEntradas = ["VIP", "REGULAR"]
  let formaPago = "Efectivo"

  expect(validar_inputs(fechaActual, fechaVisita, cantEntradas, edades, tipoEntradas, formaPago))
    .toBe(false)
}

function test_validar_fecha_pasada(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 11) // fecha en el pasado

  expect(validar_fecha(fechaActual, fechaVisita)).toBe(false)
}

function test_validar_fecha_martes(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 5, 17) // la fecha indicada es un martes. El parque está cerrado.

  expect(validar_fecha(fechaActual, fechaVisita)).toBe(false)
}

function test_validar_fecha_dentro_de_30_dias(){
  let fechaActual = new Date(2025, 5, 15)
  let fechaVisita = new Date(2025, 8, 15) // la fecha indicada supera los 30 días. No se pueden comprar con tanta anticipación.

  expect(validar_fecha(fechaActual, fechaVisita)).toBe(false)
}

function test_validar_cant_entradas_0(){
  let cantEntradas = 0

  expect(validar_cant_entradas(cantEntradas)).toBe(false)
}

function test_validar_cant_entradas_11(){
  let cantEntradas = 11

  expect(validar_cant_entradas(cantEntradas)).toBe(false)
}

function test_validar_edades_cantidad_discordante(){
  let cantEntradas = 2 //Se indica que se pasarán 2 edades
  let edades = [1] // Se pasa solo una edad

  expect(validar_edades(edades, cantEntradas)).toBe(false)
}

function test_validar_edad_mayor_a_100(){
  let edad = 120

  expect(validar_edad(edad)).toBe(false)
}

function test_validar_edad_menor_a_1(){
  let edad = 0

  expect(validar_edad(edad)).toBe(false)
}

function test_validar_tipo_entradas_cantidad_discordante(){
  let cantEntradas = 3 //Se indica que se pasarán 3 tipos de entradas
  let tipoEntradas = ["VIP", "REGULAR"] //Se pasan 2 tipos nomás

  expect(validar_tipo_entradas(tipoEntradas, cantEntradas)).toBe(false)
}

function test_validar_tipo_entrada_inexistente(){
  let tipoEntrada = "REGULAR1" //REGULAR1 no es un tipo de entrada válido

  expect(validar_tipo_entrada(tipoEntrada)).toBe(false)
}

function test_validar_forma_pago_inexistente(){
  let formaPago = "Transferencia" //Transferencia no es una forma de pago válida

  expect(validar_forma_pago(formaPago)).toBe(false)
}

function test_generar_entradas_sin_array(){
  let fechaVisita = new Date(2025, 5, 18)
  //Se busca generar una única entrada, aunque se espera que se ponga en un array
  let cantEntradas = 1
  let edades = [1]
  let tipoEntradas = ["VIP"]
  let formaPago = "Efectivo"

  //Se espera que NO sea una instancia de entrada, sino que sea un array de entradas. Por eso el .not y "Entrada" en vez de "Array<Entrada>"
  expect(generar_entradas(fechaVisita, cantEntradas, edades, tipoEntradas, formaPago)).not.toBeInstanceOf(Entrada)
}

function test_calcular_total_no_descuentos(){
  let fechaVisita = new Date(2025, 5, 18)
  let formaPago = "Efectivo"
  
  let entrada1 = new Entrada(1, "VIP", fechaVisita, formaPago)
  let entrada2 = new Entrada(100, "REGULAR", fechaVisita, formaPago)
  let entradas = [entrada1, entrada2] 

  //Como ambas entradas tienen descuentos, se espera 10000/2 + 6000/2. Se prueba que efectivamente NO devuelva 16000.
  expect(calcular_total(entradas)).not.toBe(16000)
}

function test_get_subtotal_no_descuentos(){
  let fechaVisita = new Date(2025, 5, 18)
  let formaPago = "Efectivo"
  
  let entrada = new Entrada(1, "VIP", fechaVisita, formaPago)

  //La entrada base sale 10000. Con el descuento por menor de edad deberia ser 5000. Se prueba que efectivamente NO devuelva 10000.
  expect(calcular_subtotal(entrada)).not.toBe(10000)
}

/*
comprar_entradas        | success |
validar_inputs          | success |
validar_fecha           | success |
validar_cant_entradas   | success |
validar_edades          | success |
validar_edad            | success |
validar_tipo_entradas   | success |
validar_tipo_entrada    | success |
validar_forma_pago      | success |
                        
generar_entradas        | success |
calcular_total          | success |            
calcular_subtotal()     | success |
*/
function comprar_entradas(fechaActual:Date, fechaVisita:Date, cantEntradas:number, edades:number[], tipoEntradas:string[], formaPago:string){
  if (!validar_inputs(fechaActual, fechaVisita, cantEntradas, edades, tipoEntradas, formaPago)) {
    return "Datos inválidos";
  }
  let entradas = generar_entradas(fechaVisita, cantEntradas, edades, tipoEntradas, formaPago)
  let total = calcular_total(entradas)

  return "Éxito"
}

function validar_inputs(fechaActual:Date, fechaVisita:Date, cantEntradas:number, edades:number[], tipoEntradas:string[], formaPago:string){
  if (!validar_fecha(fechaActual, fechaVisita)) {  return false  }

  if (!validar_cant_entradas(cantEntradas))   { return false  }

  if (!validar_edades(edades, cantEntradas))  { return false  }

  if (!validar_tipo_entradas(tipoEntradas, cantEntradas)) {  return false  }

  if (!validar_forma_pago(formaPago)) {  return false  }

  return true
}

function validar_fecha(fechaActual:Date, fechaVisita:Date){
  if (fechaVisita > addDays(fechaActual, 30)){//addDays añade 30 días a la fecha actual. Si la fecha de visita es despúes de 30 dias, retorna false
    return false
  }
  let dia = fechaVisita.getDay();
  if (dia === 2 || dia === 4) {//2 = Martes. 4 = Jueves
    return false;
  }
  if (fechaActual > fechaVisita){
    return false
  }
  else{
    return true
  }
}

function validar_cant_entradas(cantEntradas:number){
  return (cantEntradas>0) && (cantEntradas<=10)
}

function validar_edades(edades:number[], cantEntradas:number){
  let lengthEdades = edades.length

  if (lengthEdades !== cantEntradas){
    return false
  }

  for (let edad of edades){
    if (validar_edad(edad)){
      continue
    }
    else{
      return false
    }
  }

  return true
}

function validar_edad(edad:number){
  return (edad>0) && (edad<=100)
}

function validar_tipo_entradas(tipoEntradas:string[], cantEntradas:number){
  let lengthTipoEntradas = tipoEntradas.length

  if (lengthTipoEntradas !== cantEntradas){
    return false
  }

  for (let tipoEnt of tipoEntradas){
    if (validar_tipo_entrada(tipoEnt)){
      continue
    }
    else{
      return false
    }
  }
  
  return true
}

function validar_tipo_entrada(tipoEntrada:string){
  let tiposPosibles = ["VIP", "REGULAR"]
  return tiposPosibles.includes(tipoEntrada);
}

function validar_forma_pago(formaPago:string){
  let formasPosibles = ["Tarjeta de Crédito", "Efectivo"]
  return formasPosibles.includes(formaPago)
}

function generar_entradas(fechaVisita:Date, cantEntradas:number, edades:number[], tipoEntradas:string[], formaPago:string){
  let listaEntradas :Entrada[] = []

  for (let i = 0; i < cantEntradas; i++){
    let nuevaEntrada = new Entrada(edades[i], tipoEntradas[i], fechaVisita, formaPago)
    listaEntradas.push(nuevaEntrada)
  }

  return listaEntradas
}

function calcular_total(entradas: Entrada[]) {
  let total = 0
  for (let entr of entradas){
    total += calcular_subtotal(entr)
  }
  return total
}

function calcular_subtotal(entrada: Entrada){
  let precioTipo: number

  if (entrada.tipoEntrada === "VIP"){
    precioTipo = 10000
  }
  else {
    precioTipo = 6000
  }

  if (entrada.edad < 13 || entrada.edad >= 65){//Si es menor de 13 o de 65 o más
    precioTipo = precioTipo / 2
  }

  return precioTipo
}
// Luego lo "conectás" con Jasmine así:
describe('Comprobar casos de éxito', () => {
  it('comprar_entradas se ejecuta correctamente', test_comprar_entradas_success)
  it('validar_inputs se ejecuta correctamente', test_validar_inputs_success)
  it('validar_fecha se ejecuta correctamente', test_validar_fecha_success)
  it('validar_cant_entradas se ejecuta correctamente', test_validar_cant_entradas_success)
  it('validar_edades se ejecuta correctamente', test_validar_edades_success)
  it('validar_edad se ejecuta correctamente', test_validar_edad_success)
  it('validar_tipo_entradas se ejecuta correctamente', test_validar_tipo_entradas_success)
  it('validar_tipo_entrada se ejecuta correctamente', test_validar_tipo_entrada_success)
  it('validar_forma_pago se ejecuta correctamente', test_validar_forma_pago_success)
  
  it('generar_entradas se ejecuta correctamente', test_generar_entradas_success)
  it('calcular_total se ejecuta correctamente', test_calcular_total_success)

  it('get_subtotal se ejecuta correctamente', test_get_subtotal_success)
});

describe('Comprobar casos de fallas', () => {
  it("comprar_entradas rechaza fechas pasadas", test_comprar_entradas_fecha_pasada)
  it("validar_inputs rechaza fechas pasadas", test_validar_inputs_fecha_pasada)
  it("validar_fecha rechaza fechas pasadas", test_validar_fecha_pasada)
  it("validar_fecha rechaza dias martes", test_validar_fecha_martes)
  it("validar_fecha rechaza más de 30 días de anticipación", test_validar_fecha_dentro_de_30_dias)
  it("validar_cant_entradas rechaza 0", test_validar_cant_entradas_0)
  it("validar_cant_entradas rechaza 11", test_validar_cant_entradas_11)
  it("validar_edades rechaza cantidades discordantes", test_validar_edades_cantidad_discordante)
  it("validar_edad rechaza mayores a 100", test_validar_edad_mayor_a_100)
  it("validar_edad rechaza menores a 1", test_validar_edad_menor_a_1)
  it("validar_tipo_entradas rechaza cantidades discordantes", test_validar_tipo_entradas_cantidad_discordante)
  it("validar_tipo_entrada rechaza tipos inexistentes", test_validar_tipo_entrada_inexistente)
  it("validar_forma_pago rechaza formas inexistentes", test_validar_forma_pago_inexistente)
  it("generar_entradas rechaza el tipo 'Entrada'", test_generar_entradas_sin_array)
  it("calcular_total rechaza el monto si no se aplican los descuentos correspondientes", test_calcular_total_no_descuentos)
  it("get_subtotal rechaza el monto si no se aplica el descuentos correspondiente", test_get_subtotal_no_descuentos)
});


//Test generado automáticamente por Angular: verifica que el servicio se instancie correctamente
describe('TestService', () => {
  let service: TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});