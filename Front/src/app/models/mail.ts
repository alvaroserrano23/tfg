export class Mail{
	constructor(
		public id:string,
		public to:string,
		public from:string,
		public subject:string,
		public message:string,
		public type:string,
		public code:string
		){

		
	}
}