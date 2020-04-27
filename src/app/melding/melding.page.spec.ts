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
});
