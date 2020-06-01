import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEmergencyPage } from './detail-emergency.page';

describe('DetailEmergencyPage', () => {
  let component: DetailEmergencyPage;
  let fixture: ComponentFixture<DetailEmergencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEmergencyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('is form valid when empty', () => {
    let id = component.uploadForm.controls['id'].setValue('1');
    let emergencyContactsType = component.uploadForm.controls['emergencyContactsType'].setValue('Facilitaire diensten');
    let employeeType = component.uploadForm.controls['employeeType'].setValue('Medewerker domein');
    let employeeName = component.uploadForm.controls['phoneNumber'].setValue('Staf Coppens');
    let phoneNumber = component.uploadForm.controls['mobileNumber'].setValue('+32 3 220 54 09');
    let mobileNumber = component.uploadForm.controls['mobileNumber'].setValue('+32 470 19 02 21');
    let mail = component.uploadForm.controls['employeeType'].setValue('staf.weymiens@ap.be');
    let mail2 = component.uploadForm.controls['employeeType'].setValue('facilitairmeldpunt.ell@ap.be');

    expect(component.uploadForm.valid).toBeTruthy();
  });




});
