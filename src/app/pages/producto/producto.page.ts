import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  CheckboxCustomEvent,
  IonModal,
  SelectCustomEvent,
} from '@ionic/angular';
import { OverlayEventDetail, RangeCustomEvent, RangeValue } from '@ionic/core';
import { query } from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {
  Categorias,
  estadosPedido,
  extrasHamburguesas,
  ITamanios,
  Tamanios,
  TamaniosHamburguesa,
} from 'src/app/constants/constants';
import {
  IExtras,
  IHistorialExtras,
  IHistorialPrecio,
  IProducto,
  IPedido,
  ILineaPedido,
} from 'src/app/constants/interfaces';
import { ExtrasService } from 'src/app/services/extras/extras.service';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage/storage.service';

export interface modalExtra {}
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  producto: IProducto;
  productos: IProducto[];
  cantidad: number = 1;
  constructor(
    public firestore: AngularFirestore,
    private storage: StorageService,
    private productService: ProductoService,
    private extraService: ExtrasService,
    private pedidoService: PedidoService,
    private lineaPedidoService: LineaPedidoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input() pedido: IPedido | undefined;

  @ViewChild(IonModal) modal: IonModal;

  tamaniosHamburguesa: TamaniosHamburguesa[] = [
    TamaniosHamburguesa.Doble,
    TamaniosHamburguesa.Simple,
  ];

  tamanios: ITamanios[] = [];
  extraHamburguesas: extrasHamburguesas[] = [
    extrasHamburguesas.uno,
    extrasHamburguesas.dos,
    extrasHamburguesas.tres,
  ];
  extras$: Observable<IExtras[]> = from([]);

  tamanioSelected: boolean = false;
  isBurger: boolean = false;
  extrasSelected: IExtras[] = [];
  extrasProduct: IExtras[] = [];
  rangeValue: RangeValue;
  name: string;
  subtotal: number = 0;
  totalProducto: number = 0;
  linea: ILineaPedido = {} as ILineaPedido;
  lineasPedido$: Observable<ILineaPedido[]> = from([]);
  lineasPedido: ILineaPedido[] = [];
  isSubmitted:boolean=false;

  form: FormGroup = new FormGroup({
    idProducto: new FormControl(null, Validators.required),
    subtotal: new FormControl(null, Validators.required),
    cantidad: new FormControl(null, Validators.required),
    notasDeProducto: new FormControl(),
    tamanio: new FormControl(null, Validators.required),
  });
  get controls() {
    return this.form.controls;
  }

  ngOnInit() {
    this.lineasPedido$ = this.lineaPedidoService.getLineasPedido$;
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.form.reset();
      this.form.controls['idProducto'].setValue(id);
      this.form.controls['cantidad'].setValue(this.cantidad);
      this.form.controls['subtotal'].setValue(this.totalProducto);
      this.tamanios = [];
      this.extras$ = this.extraService.getExtras$;
      this.productService
        .getProduct(String(id))
        .pipe(first())
        .subscribe((prod) => {
          if (prod) {
            this.producto = prod;
            this.producto.histPath = 'productos/' + id;
            if (this.producto.idCategoria == Categorias.Hamburguesas) {
              this.isBurger = true;
            }
          }
          this.productService
            .getProductsId({
              where: [
                {
                  name: 'nombre',
                  validation: '==',
                  value: this.producto.nombre,
                },
                {
                  name: 'idCategoria',
                  validation: '==',
                  value: this.producto.idCategoria,
                },
              ],
            })
            .pipe(first())
            .subscribe((prods) => {
              this.productos = prods;
              const hist = this.firestore.doc(this.producto.histPath);
              hist
                .collection<IHistorialPrecio>('historial_precio', (ref) =>
                  ref.orderBy('fechaDesde', 'desc')
                )
                .valueChanges()
                .pipe(first())
                .subscribe((x) => {
                  this.producto.historial_precio = [x[0]];
                  this.producto.precio = x[0]?.precioProd ?? 0;
                  this.totalProducto = this.producto.precio;
                });
              prods.forEach((item) => {
                this.tamanios.push({ id: item.id, tamanio: item.tamanio });
              });
            });
        });

      this.extraService
        .getExtrasId({
          where: [
            {
              name: 'descExtra',
              validation: '!=',
              value: Categorias.DescHamburguesas,
            },
          ],
        })
        .subscribe((resp) => {
          resp.map((a) => {
            const hist = this.firestore.doc(a.histPath);
            hist
              .collection<IHistorialExtras>('historial_extras', (ref) =>
                ref.orderBy('fechaDesde', 'desc')
              )
              .valueChanges()
              .subscribe((x) => {
                a.historial_extra = [x[0]];
                a.precio = x[0]?.precioExtra ?? 0;
              });
          });
          this.extraService.setExtras$(resp);
        });
    });

    this.lineasPedido$.pipe(first()).subscribe((lineas)=>
      this.lineasPedido=lineas)

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.form.controls['subtotal'].setValue(this.totalProducto);
    this.modal.dismiss(this.extrasSelected, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<IExtras[]>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
      this.extrasProduct = ev.detail.data;
      console.log(this.extrasProduct);
    }
  }
  onIonChange(ev: Event) {
    this.rangeValue = (ev as RangeCustomEvent).detail.value;
  }

  setExtra(event: any) {
    const ev = event as CheckboxCustomEvent;
    if (ev.detail.checked) {
      this.extrasSelected.push(ev.detail.value);
      this.subtotal = this.subtotal + ev.detail.value.precio;
      this.totalProducto = this.totalProducto + ev.detail.value.precio;
    } else {
      this.extrasSelected = this.extrasSelected.filter((extra) => {
        extra != ev.detail.value;
      });
      this.subtotal = this.subtotal - ev.detail.value.precio;
      this.totalProducto = this.totalProducto - ev.detail.value.precio;
    }
  }

  removeExtra(event: any) {
    console.log(event.target.id);
  }

  isChecked(id: string): boolean {
    const extra = this.extrasSelected.find((ext) => ext.id == id);
    return this.extrasProduct.includes(extra);
  }
  handleFilter(event: Event) {
    let ev = event as SelectCustomEvent;
    // let precio= this.productos.find((prod)=>prod.id=ev.detail.value).
    // this.total=
    this.tamanioSelected = true;
  }
  handleFilterHamburguesas(event: any) {}

  restar() {
    if (this.cantidad > 1) {
      this.cantidad = this.cantidad - 1;
      this.form.controls['tamanio'].setValue(this.cantidad);
      this.totalProducto = this.totalProducto - this.producto.precio;
    }
  }
  sumar() {
    this.cantidad = this.cantidad + 1;
    this.form.controls['tamanio'].setValue(this.cantidad);
    this.totalProducto = this.totalProducto + this.producto.precio;
  }

  addProduct() {
    this.isSubmitted=true
    if (this.form.valid) {
      let lineaPedido: ILineaPedido = {
        cantidad: this.form.controls['cantidad'].value,
        subtotal: this.form.controls['subtotal'].value,
        notasDeProducto: this.form.controls['notasDeProducto'].value,
        idProducto: this.form.controls['idProducto'].value,
      };
      this.lineasPedido.push(lineaPedido);
      this.lineaPedidoService.setLineasPedido$(this.lineasPedido);
      console.log(lineaPedido);
      let usuario = '';
      this.storage.get('usuario').then((val) => {
        console.log(val);
      });
      let totalPedido=0;
      this.lineasPedido.forEach((linea)=>{
        totalPedido=totalPedido+this.totalProducto
      })
      let ped: IPedido = {
        fechaPedido: new Date(),
        entregaRealPed: null,
        estadoPedido: estadosPedido.Pendiente,
        formaDePago: null,
        idSucursal: 'españa1901',
        notasPedido: null,
        retiroLocalPed: null,
        idUsuario: usuario,
        total:totalPedido,
      };
      this.pedidoService.setCurrentPedido$(ped);
      // if (!this.pedido){
      // let ped:IPedido={fechaPedido:new Date(), entregaRealPed:null,
      //   estadoPedido:estadosPedido.Pendiente, formaDePago:null,
      //   idSucursal:'españa1901',notasPedido:null,retiroLocalPed:null,
      //   idUsuario:'danielmedina012@gmail.com', total:0};

      // this.pedidoService.createPedido(ped).then(
      //   (res) => {
      //     console.log(res);
      //     lineaPedido.idPedido=res;
      //     this.lineaPedidoService.createLineaPedido(lineaPedido).then(
      //       (res) => {
      //         console.log(res);
      //       },
      //       (err) => {
      //         console.log('Error linea de pedido');
      //       }
      //     );
      //   },
      //   (err) => {
      //     console.log('Error pedido');
      //   }
      // );;
      // }
      this.router.navigate(['/inicio']);
    }
  }

}
