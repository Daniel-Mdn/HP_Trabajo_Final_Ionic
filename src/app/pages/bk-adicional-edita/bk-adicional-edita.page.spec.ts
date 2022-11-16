import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkAdicionalEditaPage } from './bk-adicional-edita.page';

describe('BkAdicionalEditaPage', () => {
  let component: BkAdicionalEditaPage;
  let fixture: ComponentFixture<BkAdicionalEditaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkAdicionalEditaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkAdicionalEditaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
