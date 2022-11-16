import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkAdicionalCargaPage } from './bk-adicional-carga.page';

describe('BkAdicionalCargaPage', () => {
  let component: BkAdicionalCargaPage;
  let fixture: ComponentFixture<BkAdicionalCargaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkAdicionalCargaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkAdicionalCargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
