import { Binary } from '@angular/compiler';

export class Melding {
    constructor(
        public id: string,
        public melder: string,
        public pNummer: string,
        public datum: Date,
        public type: string,
        public locatie: string,
        public beschrijving: string,
        public locatiebeschr: string,
        private status: string,
        private reactie: Object,
        private photos: Object) {

    }
}

