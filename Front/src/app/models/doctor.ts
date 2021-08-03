export class Doctor{
	constructor(
		public id:String,
		public name:string,
		public surname:string,
		public user:string,
		public email:string,
		public password:string,
		public province:string,
		public comunidad:string,
		public address:string,
		public cp:string,
		public cv:string,
		public insurance:string,
		public numColegiado:string,
		public numOpiniones:number,
		public imagen:string,
		public especialidad:string,
		public token:string,
		public valoracion_media:number,
		public cv_validado:boolean
		){
		
	}
}