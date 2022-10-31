import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BkPedidoEstadoPage } from './bk-pedido-estado.page';

describe('BkPedidoEstadoPage', () => {
  let component: BkPedidoEstadoPage;
  let fixture: ComponentFixture<BkPedidoEstadoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BkPedidoEstadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BkPedidoEstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
