import { Component, OnInit } from '@angular/core';
import { Categorias, Tamanios } from 'src/app/constants/constants';
import { ICategoria, IProducto, IUsuario } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';
import { first } from 'rxjs/operators';
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

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private firestore: AngularFirestore,
    private productoService: ProductoService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}
  categorias: ICategoria[] = [];
  catFiltrada?: string;
  productos: IProducto[] = [];
  productos$: Observable<IProducto[]> = from([]);

  ngOnInit() {
    this.productos$ = this.productoService.getProducts$;
    this.categoriesService.getCategoriesId().subscribe((resp) => {
      this.categorias = resp;
    });
    this.productoService
      .getProductsId()
      .subscribe((resp) => {
        this.productos = resp;
        this.productoService.setProducts$(resp);
      });
  }

  handleFilter(ev: Event) {
    let event= ev as RadioGroupCustomEvent;
    this.catFiltrada = event.detail.value;
    this.productoService.getProductsId({
      where: [{ name: 'idCategoria', value: this.catFiltrada }],
    }).subscribe((res)=>{
      this.productoService.setProducts$(res)
    });
  }

  selectProduct(id: string) {
    this.router.navigate(['/producto/', id]);
  }
  getCategoriaProducto(id: string):string {
    const desc= this.categorias.find((c)=>c.id===id)?.descCategoria
    return desc?desc:"Sin categoria";
  }
}
