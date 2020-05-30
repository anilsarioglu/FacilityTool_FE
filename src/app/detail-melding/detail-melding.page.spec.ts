import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailMeldingPage } from './detail-melding.page';

describe('DetailMeldingPage', () => {
  let component: DetailMeldingPage;
  let fixture: ComponentFixture<DetailMeldingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMeldingPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailMeldingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('is form valid when empty', () => {
    let messageId = component.uploadForm.controls['messageId'].setValue('1');
    let name = component.uploadForm.controls['name'].setValue('James Bond');
    let message = component.uploadForm.controls['message'].setValue('My name is Bond, James Bond');
    let date = component.uploadForm.controls['date'].setValue(new Date());

    expect(component.uploadForm.valid).toBeTruthy();
  });


  it('is image preview existing', () => {
    expect(component.openPreview).toContain("img");
  });

  it('is sends message with socket', () => {
    expect(component.sendMessage).toContain("#input");
  });


  it('contains data', () => {
    expect(component.meldingData).toBe([]);
  });

});
