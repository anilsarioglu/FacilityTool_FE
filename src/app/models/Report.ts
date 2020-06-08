import { Category } from './Category';
import { Location } from './Location';
import { Reaction } from './Reaction';
import { Photo } from './Photo';

export class Report {
        public id: string;
        public reporter: string;
        public pNumber: string;
        public date: Date;
        public type: string;
        public requestDate: Date;
        public location: Location;
        public category: Category;
        public description: string;
        public locationDescription: string;
        public numberUpvotes: number;
        public isUpvoted: boolean;
        public status: string;
        public reactions: Reaction;
        public photos: Photo[];
}