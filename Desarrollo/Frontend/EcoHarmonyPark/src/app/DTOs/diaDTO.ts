import { Dia } from "../entidades/dia"

export class DiaDTO{
    public id!: number
    public fecha!: string

    constructor (dia: Dia){
        this.id = dia.id
        this.fecha = dia.mostrarFecha()
    }
}