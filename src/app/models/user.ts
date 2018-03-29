export class User {
    constructor(
        public id: number = null,
        public name: string = null,
        public password: string = null,
        public email: string  = null,
        public mobile: string = null,
        public details: string = null,
        public isAdmin: boolean = null,
    ) { }
}
