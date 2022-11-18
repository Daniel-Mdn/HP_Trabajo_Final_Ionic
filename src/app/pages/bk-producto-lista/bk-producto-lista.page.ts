import { Component, OnInit } from '@angular/core';
import { Categorias, Tamanios } from 'src/app/constants/constants';
import { ICategoria, ILineaPedido, IPedido, IProducto, IUsuario } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';
import { first, map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { concat, from, Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import {
  RadioGroupChangeEventDetail,
  RadioGroupCustomEvent,
} from '@ionic/angular';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { LineaPedidoService } from 'src/app/services/linea_pedido/linea-pedido.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-bk-producto-lista',
  templateUrl: './bk-producto-lista.page.html',
  styleUrls: ['./bk-producto-lista.page.scss'],
})
export class BkProductoListaPage implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private firestore: AngularFirestore,
    private productoService: ProductoService,
    private router: Router,
    private categoriesService: CategoriesService,
    private lineasPedidoService: LineaPedidoService,
    private pedidoService: PedidoService
  ) {}
  categorias: ICategoria[] = [];
  catFiltrada?: string;
  productos: IProducto[] = [];
  productos$: Observable<IProducto[]> = from([]);
  lineasPedido$: Observable<ILineaPedido[]> = from([]);
  lineasCurrentPedido: ILineaPedido[] =[];
  currentPedido: IPedido ={} as IPedido;

  ngOnInit() {
    this.productos$ = this.productoService.getProducts$;
     this.lineasPedidoService.getLineasPedido$.subscribe((lineas)=>{
      this.lineasCurrentPedido=lineas;
    });
     this.pedidoService.getCurrentPedido$.subscribe((ped)=>{
      this.currentPedido=ped
    });
    this.categoriesService.getCategoriesId().subscribe((resp) => {
      this.categorias = resp;
    });
    this.productoService
      .getProductsId({ order: 'nombre' })
      .subscribe((resp) => {
        resp = resp.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.nombre === value.nombre && t.idCategoria === value.idCategoria
            )
        );
        this.productos = resp;
        this.productoService.setProducts$(resp);
      });

  }

  handleFilter(ev: Event) {
    let event = ev as RadioGroupCustomEvent;
    this.catFiltrada = event.detail.value;
    this.productoService
      .getProductsId({
        where: [{ name: 'idCategoria', validation:'==',value: this.catFiltrada }],
        order: 'nombre',
      })
      .subscribe((res) => {
        res = res.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.nombre === value.nombre)
        );
        this.productoService.setProducts$(res);
      });
  }

  selectProduct(id: string) {
    console.log('id: '+id)
    this.router.navigate(['/bk-producto-edita', id]);
  }
  getCategoriaProducto(id: string): string {
    const desc = this.categorias.find((c) => c.id === id)?.descCategoria;
    return desc ? desc : 'Sin categoria';
  }
  navigateToCarrito(){
    this.router.navigate(['/carrito']);
  }
}
