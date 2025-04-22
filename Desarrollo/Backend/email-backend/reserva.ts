import { Participante } from "./participante";

interface Actividad {
    id: number;
    nombre: string;
    vestimenta: boolean;
}

interface DiaElegido {
    id: number;
    fecha: string; // Podrías usar Date si la transformás
}

interface HorarioElegido {
    id: number;
    horaInicio: string;
    horaFin: string;
    cuposTotales: number;
    cuposOcupados: number;
}

export interface Reserva {
    actividad: Actividad;
    diaElegido: DiaElegido;
    horarioElegido: HorarioElegido;
    participantes: Participante[];
}