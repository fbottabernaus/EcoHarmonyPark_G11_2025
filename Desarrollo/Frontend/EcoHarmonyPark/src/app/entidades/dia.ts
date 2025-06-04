import { Horario } from "./horario";

const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',   // Nombre completo del día
    year: 'numeric',   // Año en formato numérico
    month: 'long',     // Nombre completo del mes
    day: 'numeric',    // Día del mes
  });

export class Dia{
    public id!: number
    public fecha!: Date
    public horarios: Horario[] = [];

    constructor(){
        this.horarios = []
        //Creacion de varios horarios seguidos.
        for (let i = 0; i < 11; i++){
            let nuevoHorario = new Horario()
            let horaInicio = 9 + i

            nuevoHorario.id = i
            nuevoHorario.horaInicio = horaInicio + ":00"
            nuevoHorario.horaFin = (horaInicio+1) + ":00"
            nuevoHorario.cuposTotales = 10
            nuevoHorario.cuposOcupados = 0

            this.horarios.push(nuevoHorario)
        }
    }

    addHorario(nuevoHorario: Horario) {
        this.horarios.push(nuevoHorario)
    }

    mostrarFecha(){
        return formatter.format(this.fecha);
    }
    
    static fromJSON(obj: any): Dia {
        let d = new Dia();
        d.id = obj.id;
        d.fecha = new Date(obj.fecha);
        d.horarios = obj.horarios.map((h: any) => Horario.fromJSON(h));
        return d;
    }
}