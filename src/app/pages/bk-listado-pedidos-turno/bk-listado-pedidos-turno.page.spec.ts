import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkListadoPedidosTurnoPage } from './bk-listado-pedidos-turno.page';

describe('BkListadoPedidosTurnoPage', () => {
  let component: BkListadoPedidosTurnoPage;
  let fixture: ComponentFixture<BkListadoPedidosTurnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkListadoPedidosTurnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkListadoPedidosTurnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
