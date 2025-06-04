import { Actividad } from "../entidades/actividad";
import { Dia } from "../entidades/dia";
import { Horario } from "../entidades/horario";
import { Participante } from "../entidades/participante";
import { ActividadDTO } from "./actividadDTO";
import { DiaDTO } from "./diaDTO";



export class InscripcionDTO{
    public id!: number;
    public actividad:ActividadDTO
    public diaElegido:DiaDTO
    public horarioElegido:Horario
    public participantes:Participante[]
    
    constructor(actividad:Actividad, dia:Dia, horario:Horario, participantes:Participante[]){
        this.actividad = new ActividadDTO(actividad.id, actividad.nombre, actividad.vestimenta)
        this.diaElegido = new DiaDTO(dia)
        this.horarioElegido = horario
        this.participantes = participantes
    }
}