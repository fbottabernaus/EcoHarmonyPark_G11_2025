export class Participante{
    public id:number
    public nombre!:string
    public dni!:number
    public edad!:number
    public talla!:string

    constructor(id:number){
        this.id = id
    }
    
    tieneNulls(vestimenta: boolean) {
        let nombre = this.nombre
        let nombreBandera = nombre === "" || nombre === undefined

        let dni = this.dni
        let dniBandera = dni === null || dni === undefined

        let edad = this.edad
        let edadBandera = edad === null ||edad === undefined

        let talleBandera
        if (vestimenta){
            let talla = this.talla
            talleBandera = talla === "" || talla === undefined
        }
        else{ 
            talleBandera = false
        }

        
        return nombreBandera || dniBandera || edadBandera || talleBandera
    }

}