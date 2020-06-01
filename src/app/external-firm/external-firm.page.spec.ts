import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExternalFirmPage } from './external-firm.page';

describe('ExternalFirmPage', () => {
  let component: ExternalFirmPage;
  let fixture: ComponentFixture<ExternalFirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalFirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalFirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
