import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxCustomEvent, IonModal } from '@ionic/angular';
import { OverlayEventDetail, RangeCustomEvent, RangeValue } from '@ionic/core';
import {
  Extras,
  extrasHamburguesas,
  Tamanios,
  TamaniosHamburguesa,
} from 'src/app/constants/constants';
import { IProducto } from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';

export interface modalExtra{
}
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producto: IProducto;
  constructor(
    public firestore: AngularFirestore,
    private productService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input() total: number = 0;

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

  extrasSelected: Extras[] = [];
  extrasProduct: Extras[]=[]
  rangeValue: RangeValue;
  name: string;
  subtotal: number = 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id=params.id;
      this.productService
        .getProduct(String(id))
        .subscribe((prod) => {
          console.log(prod)
          if (prod) {
            this.producto = prod;
          }
        });
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.extrasSelected, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Extras[]>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data)
      this.extrasProduct=ev.detail.data
      console.log(this.extrasProduct)

    }
  }
  onIonChange(ev: Event) {
    this.rangeValue = (ev as RangeCustomEvent).detail.value;
  }

  setExtra(event: any) {
    const ev = event as CheckboxCustomEvent;
    if (ev.detail.checked) {
      const extra = this.extras.find(extra => extra.id == ev.target.id);
      this.extrasSelected.push(extra);
      this.subtotal = this.subtotal + extra.precio;
    } else {
      const extra = this.extras.find((extra) => {
        extra.id == ev.target.id;
      });
      this.extrasSelected = this.extrasSelected.filter((extra) => {
        extra != extra;
      });
      this.subtotal = this.subtotal - extra.precio;
    }
  }

  removeExtra(event:any){
    console.log(event.target.id)
  }

  isChecked(id:string):boolean{
    const extra= this.extras.find(ext=>ext.id==id)
    return this.extrasProduct.includes(extra)
  }
  handleFilter(event: any) {}
  handleFilterHamburguesas(event: any) {}
}
