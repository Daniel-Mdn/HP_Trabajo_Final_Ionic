import { Component, OnInit } from '@angular/core';
import { Categorias, Tamanios } from 'src/app/constants/constants';
import { ICategoria, IProducto, IUsuario } from 'src/app/constants/interfaces';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';
import { first } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { concat } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(private usuarioService: UsuarioService, private productoService: ProductoService, private router: Router,  private categoriesService:CategoriesService) {
  }
  categorias: ICategoria[] = [];
  catFiltrada?: number;
  productos: IProducto[] = [];
  list: IProducto[] = [];
  ngOnInit() {
    this.categoriesService.getCategories().subscribe((resp)=>{
      this.categorias=resp;
    })
    this.productoService.getProducts().subscribe((resp)=>{
      this.productos=resp
      this.list = this.productos;
    })
  }

  handleFilter(event: any) {
    this.catFiltrada = event.detail.value;
    if (this.catFiltrada != -1) {
      this.list = this.productos.filter((prod) => {
        return prod.idCat === Number(this.catFiltrada!);
      });
    } else {
      return (this.list = this.productos);
    }
  }

  selectProduct(id: number) {
    this.router.navigate(['/producto/', id]);  }
}
