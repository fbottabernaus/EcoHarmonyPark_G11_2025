export class Horario{
    public id!: number;
    public horaInicio!: string;
    public horaFin!: string;
    public cuposTotales!: number;
    public cuposOcupados!: number;

    mostrarInicioFin(){
        return this.horaInicio
    }

    cuposDisponibles(){
        return this.cuposTotales - this.cuposOcupados
    }

    noCupos(){
        return this.cuposDisponibles() <= 0
    }

    toString(){
        let cadena = this.horaInicio + " | "
        if (this.noCupos()){
            cadena += "Sin cupos"
        }
        else{
            cadena += "Quedan " + this.cuposDisponibles() + " cupos"
        }
        return cadena
    }
    
    static fromJSON(obj: any): Horario {
        let h = new Horario();
        h.id = obj.id;
        h.horaInicio = obj.horaInicio;
        h.horaFin = obj.horaFin;
        h.cuposTotales = obj.cuposTotales;
        h.cuposOcupados = obj.cuposOcupados;
        return h;
    }

}