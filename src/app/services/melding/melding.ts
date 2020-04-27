import { Binary } from '@angular/compiler';

export class Melding {
    constructor(
        public _id: string,
        public melder: string,
        public pNummer: string,
        public datum: String,
        public type: string,
        public locatie: string,
        public beschrijving: string,
        public locatiebeschr: string,
        private status: string
        /*public image: Binary*/) {

    }
}