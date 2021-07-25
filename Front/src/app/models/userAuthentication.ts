export class UserAuthentication{
	constructor(
		public id:String,
		public user:string,
		public password:string,
		public email:string,
		public code:string,
		public role:string,
		public token:string
		){
		
	}
}