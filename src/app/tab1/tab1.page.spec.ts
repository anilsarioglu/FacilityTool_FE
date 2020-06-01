import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab1Page } from './tab1.page';
import { ReportService } from '../services/report/report.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { DummyReport } from '../models/dummyReport';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  let reportService: ReportService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot()],
      providers: [ReportService]
    }).compileComponents();

    reportService = TestBed.get(ReportService);
    httpMock = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  const reportData: DummyReport[] = [
    { id: '1', reporter: 'Selena Gomez', pNumber: "P106206", type: 'Defect' },
    { id: '2', reporter: 'Ariana Grande', pNumber: "P105106", type: 'Opdracht' }
  ];


  it('should retrieve all meldingen via GET', () => {
    reportService.getAllReports().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(this.meldingData);
    });

    const allRequest = httpMock.expectOne(this.urlReports);

    expect(allRequest.request).toBe('GET');

    allRequest.flush(reportData);
  });

});
