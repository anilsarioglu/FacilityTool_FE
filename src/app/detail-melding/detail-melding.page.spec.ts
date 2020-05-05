import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailMeldingPage } from './detail-melding.page';

describe('DetailMeldingPage', () => {
  let component: DetailMeldingPage;
  let fixture: ComponentFixture<DetailMeldingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMeldingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailMeldingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
