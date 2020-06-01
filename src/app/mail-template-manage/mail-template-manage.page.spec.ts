import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailTemplateManagePage } from './mail-template-manage.page';

describe('MailTemplateManagePage', () => {
  let component: MailTemplateManagePage;
  let fixture: ComponentFixture<MailTemplateManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailTemplateManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailTemplateManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
