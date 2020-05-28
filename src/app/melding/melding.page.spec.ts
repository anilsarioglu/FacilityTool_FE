import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeldingPage } from './melding.page';

describe('MeldingPage', () => {
  let component: MeldingPage;
  let fixture: ComponentFixture<MeldingPage>;

  let reactionData = [
    { name: "Tom Welling", message: "Superman", date: new Date() },
    { name: "Tom Cruise", message: "Superhero", date: new Date() }
  ];

  let photoData = [
    {
      name: "deur.jpg", lastModified: 1587962146850, lastModifiedDate: "2020-04-27T04:35:46.850Z",
      size: 18832, type: "image/jpeg", url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAKBueIx4ZKCMgoy..."
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeldingPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeldingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // //check if date picker component starts invisible
  // it('date picker should be hidden', () => {
  //     expect(component.showDateSelector).toBeFalsy();
  //   });

  // //check if date is current date
  // it('default date should be now', () => {
  //   expect(component.date).toEqual(new Date());
  // });

  // //check if date is current date
  // it('default date should be now', () => {
  //   expect(component.date).toEqual(new Date());
  // });

  // //check if request date start empty
  // it('request date should be empty', () => {
  //   expect(component.requestDate).toBeUndefined();
  // });


  it('is form valid when empty', () => {
    let id = component.uploadForm.controls['id'].setValue('1');
    let reporter = component.uploadForm.controls['reporter'].setValue('Tom Welling');
    let pNumber = component.uploadForm.controls['pNumber'].setValue('P105106');
    let date = component.uploadForm.controls['date'].setValue(new Date());
    let type = component.uploadForm.controls['type'].setValue('Defect');
    let location = component.uploadForm.controls['location'].setValue('00.02 PROJECTRUIMTE');
    let description = component.uploadForm.controls['description'].setValue('deur kapot');
    let locationdescription = component.uploadForm.controls['locationdescription'].setValue('je weet zelf G');
    let status = component.uploadForm.controls['status'].setValue('IN_BEHANDELING');
    let reaction = component.uploadForm.controls['reaction'].setValue(reactionData);
    let photos = component.uploadForm.controls['photos'].setValue(photoData);
    expect(component.uploadForm.valid).toBeTruthy();
  });


  it('is form invalid when beschrijving less than 100', () => {
    let id = component.uploadForm.controls['id'].setValue('1');
    let reporter = component.uploadForm.controls['reporter'].setValue('Tom Welling');
    let pNumber = component.uploadForm.controls['pNumber'].setValue('P105106');
    let date = component.uploadForm.controls['date'].setValue(new Date());
    let type = component.uploadForm.controls['type'].setValue('Defect');
    let location = component.uploadForm.controls['location'].setValue('00.02 PROJECTRUIMTE');
    let description = component.uploadForm.controls['description'].setValue('deur kapot');
    let locationdescription = component.uploadForm.controls['locationdescription'].setValue('je weet zelf G');
    let status = component.uploadForm.controls['status'].setValue('IN_BEHANDELING');
    let reaction = component.uploadForm.controls['reaction'].setValue(reactionData);
    let photos = component.uploadForm.controls['photos'].setValue(photoData);
    expect(component.uploadForm.valid).toBeFalsy();
    expect(component.uploadForm.controls['beschrijving'].valid).toBeFalsy();
  });


  it('is form invalid when locatiebeschr less than 100', () => {
    let id = component.uploadForm.controls['id'].setValue('1');
    let reporter = component.uploadForm.controls['reporter'].setValue('Tom Welling');
    let pNumber = component.uploadForm.controls['pNumber'].setValue('P105106');
    let date = component.uploadForm.controls['date'].setValue(new Date());
    let type = component.uploadForm.controls['type'].setValue('Defect');
    let location = component.uploadForm.controls['location'].setValue('00.02 PROJECTRUIMTE');
    let description = component.uploadForm.controls['description'].setValue('deur kapot');
    let locationdescription = component.uploadForm.controls['locationdescription'].setValue('je weet zelf G');
    let status = component.uploadForm.controls['status'].setValue('IN_BEHANDELING');
    let reaction = component.uploadForm.controls['reaction'].setValue(reactionData);
    let photos = component.uploadForm.controls['photos'].setValue(photoData);
    expect(component.uploadForm.valid).toBeFalsy();
    expect(component.uploadForm.controls['locatiebeschr'].valid).toBeFalsy();
    expect(component.uploadForm.valid).toBeFalsy();
  });

});
