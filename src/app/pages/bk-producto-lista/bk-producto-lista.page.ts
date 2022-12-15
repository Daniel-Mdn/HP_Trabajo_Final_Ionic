import { Component, OnInit } from '@angular/core';
import { Categorias, Tamanios } from 'src/app/constants/constants';
import {
  ICategoria,
  IHistorialPrecio,
  ILineaPedido,
  IPedido,
  IProducto,
  IUsuario,
  IWhere,
} from 'src/app/constants/interfaces';
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
  SearchbarCustomEvent,
} from '@ionic/angular';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { DocumentSnapshot, where } from 'firebase/firestore';
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
  searchFiltrado?: string;
  productos: IProducto[] = [];
  productos$: Observable<IProducto[]> = from([]);
  lineasPedido$: Observable<ILineaPedido[]> = from([]);
  lineasCurrentPedido: ILineaPedido[] = [];
  currentPedido: IPedido = {} as IPedido;

  ngOnInit() {
    this.productos$ = this.productoService.getProducts$;
    this.lineasPedidoService.getLineasPedido$.subscribe((lineas) => {
      this.lineasCurrentPedido = lineas;
    });
    this.pedidoService.getCurrentPedido$.subscribe((ped) => {
      this.currentPedido = ped;
    });
    this.categoriesService.getCategoriesId().subscribe((resp) => {
      this.categorias = resp;
    });
    this.productoService
      .getProductsId({ order: 'nombre' })
      .subscribe((resp) => {
        this.productos = resp;
        this.productos.map((p) => {
          p.histPaths;
          p.historial_precio = [];
          const hist = this.firestore.doc(p.histPath);
          hist
            .collection<IHistorialPrecio>('historial_precio', (ref) =>
              ref.orderBy('fechaDesde', 'desc')
            )
            .valueChanges()
            .pipe(first())
            .subscribe((x) => {
              p.historial_precio.push({ tamanio: p.tamanio, ...x[0] });
              p.precio = x[0]?.precioProd ?? 0;
              // this.totalProducto = this.producto.precio;
            });
        });
        console.log(this.productos);
        this.productoService.setProducts$(this.productos);
      });
  }

  handleFilter(ev: Event) {
    let event = ev as RadioGroupCustomEvent;
    this.catFiltrada = event.detail.value;
    let where:IWhere[]=[];
    if (this.catFiltrada=="todos"){
      where=[];
    }else{
      where.push({ name: 'idCategoria', validation: '==', value: this.catFiltrada })
    }
    this.productoService
      .getProductsId({
        where: where,
        order: 'nombre',
      })
      .pipe(
        map((res) => {
          return res.filter((item) =>
            item.nombre
              .toLowerCase()
              .includes(this.searchFiltrado??'')
          );
        })
      )
      .subscribe((resp) => {
        this.productos = resp;
        this.productos.map((p) => {
          p.histPaths;
          p.historial_precio = [];
          const hist = this.firestore.doc(p.histPath);
          hist
            .collection<IHistorialPrecio>('historial_precio', (ref) =>
              ref.orderBy('fechaDesde', 'desc')
            )
            .valueChanges()
            .pipe(first())
            .subscribe((x) => {
              p.historial_precio.push({ tamanio: p.tamanio, ...x[0] });
              p.precio = x[0]?.precioProd ?? 0;
              // this.totalProducto = this.producto.precio;
            });
        });
        this.productoService.setProducts$(this.productos);
      });
  }

  selectProduct(id: string) {
    this.router.navigate(['/bk-producto-edita/', id]);
  }
  getCategoriaProducto(id: string): string {
    const desc = this.categorias.find((c) => c.id === id)?.descCategoria;
    return desc ? desc : 'Sin categoria';
  }
  navigateToCarrito() {
    this.router.navigate(['/carrito']);
  }
  goPrevPage() {
    this.router.navigate(['/bk-menu-productos']);
  }
  redirectHome() {
    this.router.navigate(['/bk-menu-empleado']);
  }

  handleChange(event: any) {
    let eventSearch = event as SearchbarCustomEvent;
    this.searchFiltrado=eventSearch.target.value.toLowerCase()
    let whereQuery: IWhere[]=[];
    if (this.catFiltrada && this.catFiltrada!='todos') {
      whereQuery.push({
        name: 'idCategoria',
        validation: '==',
        value: this.catFiltrada,
      });
    }
    this.productoService
      .getProductsId({
        order: 'nombre',
        where: whereQuery,
      })
      .pipe(
        map((res) => {
          return res.filter((item) =>
            item.nombre
              .toLowerCase()
              .includes(eventSearch.target.value.toLowerCase())
          );
        })
      )
      .subscribe((resp) => {
        this.productos = resp;
        this.productos.map((p) => {
          p.histPaths;
          p.historial_precio = [];
          const hist = this.firestore.doc(p.histPath);
          hist
            .collection<IHistorialPrecio>('historial_precio', (ref) =>
              ref.orderBy('fechaDesde', 'desc')
            )
            .valueChanges()
            .pipe(first())
            .subscribe((x) => {
              p.historial_precio.push({ tamanio: p.tamanio, ...x[0] });
              p.precio = x[0]?.precioProd ?? 0;
              // this.totalProducto = this.producto.precio;
            });
        });
        this.productoService.setProducts$(this.productos);
      });
  }
}
