import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail, RangeCustomEvent, RangeValue } from '@ionic/core';
import {
  Extras,
  extrasHamburguesas,
  Tamanios,
  TamaniosHamburguesa,
} from 'src/app/constants/constants';
import { IProducto } from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  constructor(
    private productService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  producto: IProducto = {
    id: 2,
    nombre: 'Normalita',
    baja: false,
    disponibilidad: true,
    idCat: 1,
    tamanio: Tamanios.Simple,
    descProd:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };
  @ViewChild(IonModal) modal: IonModal;
  tamaniosHamburguesa: TamaniosHamburguesa[] = [
    TamaniosHamburguesa.Doble,
    TamaniosHamburguesa.Simple,
  ];
  extraHamburguesas: extrasHamburguesas[] = [
    extrasHamburguesas.uno,
    extrasHamburguesas.dos,
    extrasHamburguesas.tres,
  ];
  extras: Extras[] = [
    {
      id: '1',
      cantidad: 1,
      precio: 100,
      descExtra: 'Panceta',
      idLineaDePed: 1,
    },
    {
      id: '2',
      cantidad: 1,
      precio: 100,
      descExtra: 'Queso Cheddar',
      idLineaDePed: 1,
    },
    {
      id: '3',
      cantidad: 1,
      precio: 100,
      descExtra: 'Queso Azul',
      idLineaDePed: 1,
    },
  ];
  rangeValue: RangeValue;
  name: string;
  subtotal: number=0;
  total: number=0;
  ngOnInit() {
    this.productService
      .getProduct(this.route.snapshot['id'])
      .subscribe((prod) => {
        if (prod) {
          this.producto = prod;
        }
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.name = `Hello, ${ev.detail.data}!`;
    }
  }
  onIonChange(ev: Event) {
    this.rangeValue = (ev as RangeCustomEvent).detail.value;
  }
  handleFilter(event: any) {}
  handleFilterHamburguesas(event: any) {}
}
