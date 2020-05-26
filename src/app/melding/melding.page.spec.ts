import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeldingPage } from './melding.page';

describe('MeldingPage', () => {
  let component: MeldingPage;
  let fixture: ComponentFixture<MeldingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeldingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeldingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    //check if date picker component starts invisible
    it('date picker should be hidden', () => {
      expect(component.showDateSelector).toBeFalsy();
    });
  
    //check if date is current date
    it('default date should be now', () => {
      expect(component.date).toEqual(new Date());
    });
  
      //check if date is current date
      it('default date should be now', () => {
        expect(component.date).toEqual(new Date());
      });
  
    //check if request date start empty
    it('request date should be empty', () => {
      expect(component.requestDate).toBeUndefined();
    });

});
