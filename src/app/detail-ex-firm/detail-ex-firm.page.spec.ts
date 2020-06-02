import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailExFirmPage } from './detail-ex-firm.page';

describe('DetailExFirmPage', () => {
  let component: DetailExFirmPage;
  let fixture: ComponentFixture<DetailExFirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExFirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailExFirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
