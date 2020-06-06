import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignedReportsPage } from './assigned-reports.page';

describe('AssignedReportsPage', () => {
  let component: AssignedReportsPage;
  let fixture: ComponentFixture<AssignedReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
