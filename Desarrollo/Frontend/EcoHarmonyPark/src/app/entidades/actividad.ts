import { Dia } from "./dia";
import { Horario } from "./horario";
import { format, addDays } from 'date-fns';

export class Actividad{
    public id!: number;
    public nombre!: string;
    public tyc!: string;
    public dias: Dia[] = [];
    public vestimenta!: boolean;

    constructor(){
        this.dias = [];
        //Creación de varios dias seguidos.
        let fecha = new Date();

        for (let i = 0; i < 30; i++){
            let nuevoDia = new Dia()
            
            nuevoDia.id = i
            nuevoDia.fecha = addDays(fecha, i)
            
            this.dias.push(nuevoDia)
        }
    }
    
    getNombre(){
        return this.nombre;
    }


    /*
    noCupos(){
        for (let hor of this.dias.horarios){
            if (!hor.noCupos()){//Si alguno horario tiene cupo, devuelve false
                return false
            }
        }
        return true//Si ningun horario tuvo cupos, devuelve true
    }
        */

    toString(){
        let cadena = this.nombre
        /*
        if (this.noCupos()){
            cadena += " | Sin cupos" 
        }
        */
        return cadena
    }
    
    addDia(nuevoDia: Dia) {
        this.dias.push(nuevoDia)
    }
    static fromJSON(obj: any): Actividad {
        let a = new Actividad();
        a.id = obj.id;
        a.nombre = obj.nombre;
        a.tyc = obj.tyc;
        a.vestimenta = obj.vestimenta;
        a.dias = obj.dias.map((d: any) => Dia.fromJSON(d));
        return a;
    }
}