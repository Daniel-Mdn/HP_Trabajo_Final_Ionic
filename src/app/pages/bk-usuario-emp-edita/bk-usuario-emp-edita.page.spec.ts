import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkUsuarioEmpEditaPage } from './bk-usuario-emp-edita.page';

describe('BkUsuarioEmpEditaPage', () => {
  let component: BkUsuarioEmpEditaPage;
  let fixture: ComponentFixture<BkUsuarioEmpEditaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkUsuarioEmpEditaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkUsuarioEmpEditaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
