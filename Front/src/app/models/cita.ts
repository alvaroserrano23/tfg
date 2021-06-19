export class Cita{
    constructor(
        public id:String,
        public asunto:String,
        public descripcion:String,
        public id_paciente:String,
        public id_doctor:String,
        public fecha:String,
        public hora:String,
        public direccion_consulta:String,
        public estado:String
        ){
        
    }
}