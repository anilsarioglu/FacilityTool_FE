
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReportService } from './report.service';
import { Melding } from './melding';
import { DummyReport } from '../../models/dummyReport';


describe('MeldingService', () => {

    let reportService: ReportService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ReportService]
        });
        reportService = TestBed.get(ReportService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    const reportData: DummyReport[] = [
        { id: '1', reporter: 'Selena Gomez', pNumber: "P106206", type: 'Defect' },
        { id: '2', reporter: 'Ariana Grande', pNumber: "P105106", type: 'Opdracht' }
    ];


    it('should retrieve all meldingen via GET', () => {
        reportService.getAllReports().subscribe(data => {
            expect(data.length).toBe(2);
            expect(data).toEqual(this.reportData);
        });

        const allRequest = httpMock.expectOne(this.urlReports);

        expect(allRequest.request).toBe('GET');

        allRequest.flush(reportData);
    });


    it('should retrieve specific melding via GET', () => {
        for (let i = 0; i < this.reportData.length; i++) {
            if (this.reportData[i].id == 1) {
                reportService.getReportById(this.reportData[i].id).subscribe(data => {
                    expect(data.id.length).toBe(1);
                    expect(data).toEqual(this.meldingData[i].id);
                });
            }
            const allRequest = httpMock.expectOne(this.getById);
            expect(allRequest.request).toBe('GET');
            allRequest.flush(reportData);
        }
    });


    it('should delete specific melding via GET', () => {
        for (let i = 0; i < this.reportData.length; i++) {
            if (this.reportData[i].id == 1) {
                reportService.deleteReportById(this.reportData[i].id).subscribe(data => {
                    expect(data).toBe(1);
                    expect(data).toEqual(this.reportData[i].id);
                });
            }
            const allRequest = httpMock.expectOne(this.deleteReportById);
            expect(allRequest.request).toBe('GET');
            allRequest.flush(this.meldingData);
        }
    });
});
