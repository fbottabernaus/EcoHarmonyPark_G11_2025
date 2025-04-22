export class ActividadDTO{
    public id!:number
    public nombre!: string;
    public vestimenta!: boolean;

    constructor(id:number, nombre: string, vestimenta: boolean){
        this.id = id
        this.nombre = nombre
        this.vestimenta = vestimenta
    }
}