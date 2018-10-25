export class User {
    // public nombre: string;

    // constructor(nombre: string) {
    //     this.nombre = nombre;
    // }

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public image?: string,
        public role?: string,
        public google?: string,
        public _id?: string
    ) {}
}
