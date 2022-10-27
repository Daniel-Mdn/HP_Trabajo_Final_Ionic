import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/constants/interfaces';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-bk-producto-edita',
  templateUrl: './bk-producto-edita.page.html',
  styleUrls: ['./bk-producto-edita.page.scss'],
})
export class BkProductoEditaPage implements OnInit {
  form:FormGroup
  producto:IProducto
  productService: ProductoService
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
  ) {
    this.form = this.formBuilder.group({
      prodId: [''],
      categoria:[''],
      tamanio: [''],
      nombre: [''],
      descProd: [''],
      disponibilidad: [''],
      imagen: [''],
      costoProd: [''],
      margen: [''],
      precioProd: [''],
    })
  }

  ngOnInit() {
  }

  goPrevPage(){

  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }
}
