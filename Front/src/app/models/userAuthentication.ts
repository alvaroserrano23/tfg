export class UserAuthentication{
	constructor(
		public id:string,
		public user:string,
		public password:string,
		public email:string,
		public code:string,
		public role:string
		){
		
	}
}