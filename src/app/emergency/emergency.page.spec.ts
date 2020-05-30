import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmergencyPage } from './emergency.page';
import { EmergencyService } from '../services/emergency/emergency.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { Emergency } from '../models/Emergency';

describe('EmergencyPage', () => {
  let component: EmergencyPage;
  let fixture: ComponentFixture<EmergencyPage>;

  let emergencyService: EmergencyService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyPage],
      imports: [IonicModule.forRoot()],
      providers: [EmergencyService]
    }).compileComponents();

    emergencyService = TestBed.get(EmergencyService);
    httpMock = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(EmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  const emergencyData: Emergency[] = [
    { id: '1', emergencyContactsType: 'Facilitaire diensten', employeeType: "Medewerker domein", employeeName: "James Bond", phoneNumber: '+32 3 220 54 09', mobileNumber: "+32 470 19 02 21", mail: "a@ap.be", mail2: "b@ap.be" },
    { id: '2', emergencyContactsType: 'Onderhoudsmedewerker', employeeType: "Onderhoudsmedewerker", employeeName: "Harry potter", phoneNumber: '+32 3 220 54 09', mobileNumber: "+32 470 19 02 21", mail: "a@ap.be", mail2: "b@ap.be" }
  ];

  it('should retrieve all emergencies via GET', () => {
    emergencyService.getAllEmergencies().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(this.meldingData);
    });

    const allRequest = httpMock.expectOne(this.urlEmergencies);

    expect(allRequest.request).toBe('GET');

    allRequest.flush(emergencyData);
  });

});
