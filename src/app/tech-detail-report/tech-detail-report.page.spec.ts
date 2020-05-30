import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechDetailReportPage } from './tech-detail-report.page';

describe('TechDetailReportPage', () => {
  let component: TechDetailReportPage;
  let fixture: ComponentFixture<TechDetailReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechDetailReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechDetailReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
