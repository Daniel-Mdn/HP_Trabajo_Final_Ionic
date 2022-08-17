import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Tamanios, TamaniosHamburguesa } from 'src/app/constants/constants';
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
  ngOnInit() {
    this.productService
      .getProduct(this.route.snapshot['id'])
      .subscribe((prod) => {
        if (prod) {
          this.producto = prod;
        }
      });
  }

  name: string;

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
  handleFilter(event: any) {}
}
