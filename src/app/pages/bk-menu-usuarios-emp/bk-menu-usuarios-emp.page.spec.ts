import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkMenuUsuariosEmpPage } from './bk-menu-usuarios-emp.page';

describe('BkMenuUsuariosEmpPage', () => {
  let component: BkMenuUsuariosEmpPage;
  let fixture: ComponentFixture<BkMenuUsuariosEmpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkMenuUsuariosEmpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkMenuUsuariosEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
