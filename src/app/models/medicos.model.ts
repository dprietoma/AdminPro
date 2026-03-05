import { Hospital } from "./hospital.models";

interface _MedicoUsuario {
    _id: string;
    nombre: string;
    img: string;
}



export class Medico {
    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicoUsuario,
        public hospital?: Hospital,
    ) { }
}