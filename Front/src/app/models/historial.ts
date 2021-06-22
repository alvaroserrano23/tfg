export class Historial{
	constructor(
        //nombre_paciente
        //apellidos_paciente
        //direccion
		public id:String,
        public id_doctor:String,
        public id_paciente:String,
		public dni_paciente:String,
		public edad_paciente:Number,
		public fecha_nacimiento_paciente:String,
        public patologias_paciente:String,
        public alergias_paciente:String,
        public vacunas_paciente:String
        //CONSULTA
        //public sintomas:String,
        //public evolucion_paciente:String,
        //public ordenes_medicas:String,
        //public tratamientos
		
		){
		
	}
}