import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocatiePage } from './locatie.page';

describe('LocatiePage', () => {
  let component: LocatiePage;
  let fixture: ComponentFixture<LocatiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocatiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
