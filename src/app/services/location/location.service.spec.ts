
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocationService } from './location.service';
import { Location } from '../../models/Location';


describe('LocationService', () => {

    let LocationService: LocationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LocationService]
        });
        LocationService = TestBed.get(LocationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    const locationData: Location[] = [
        { id: '1', campus: 'Spoor Noord - Ellermanstraat', floor: 3, room: '00.02', name: 'Projectruimte' },
        { id: '2', campus: 'Spoor Noord - Noorderplaats', floor: 5, room: '05.05', name: 'Technische ruimte' }
    ];


    it('should retrieve all locations via GET', () => {
        LocationService.getAllLocations().subscribe(data => {
            expect(data.length).toBe(2);
            expect(data).toEqual(locationData);
        });

        const allRequest = httpMock.expectOne(this.urlLocations);

        expect(allRequest.request).toBe('GET');

        allRequest.flush(this.locationData);
    });

});
