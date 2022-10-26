import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkUsuarioEmpRegistroPage } from './bk-usuario-emp-registro.page';

describe('BkUsuarioEmpRegistroPage', () => {
  let component: BkUsuarioEmpRegistroPage;
  let fixture: ComponentFixture<BkUsuarioEmpRegistroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkUsuarioEmpRegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkUsuarioEmpRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
