import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-producto-registra',
  templateUrl: './bk-producto-registra.page.html',
  styleUrls: ['./bk-producto-registra.page.scss'],
})

export class BkProductoRegistraPage implements OnInit {
  form:FormGroup;
  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      categoria: ['', Validators.required],
      nombre:['', Validators.required] ,
      descProd: ['', Validators.required],
      tamanio: ['', Validators.required],
      costoProd: [null, Validators.required],
      precioProd: [null, Validators.required],
      margen: [null,Validators.required]
    })
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  ngOnInit() {
  }

  async registrarProducto(){
    const today = new Date();
    var prodId = '';
    var dataProducto = {
      idCategoria: this.form.controls.categoria.value,
      nombre: this.form.controls.nombre.value,
      descProd: this.form.controls.descProd.value,
      tamanio: this.form.controls.tamanio.value,
      disponibilidad: true,
      baja: false
    }
    var precioProducto = {
      fechaDesde: today,
      costoProd: parseInt(this.form.controls.costoProd.value),
      precioProd: parseInt(this.form.controls.precioProd.value),
      margen: parseInt(this.form.controls.margen.value)
    }

    await this.firestore.collection('productos').add(dataProducto)
      .then(function(prod){
        console.log(prod.id);
        prodId = prod.id;
        console.log('prodId: '+prodId);
    });

    await console.log('prodId fuera funcion: '+prodId);
    await this.firestore.collection('productos').doc(prodId).collection('historial_precio').add(precioProducto);
      
  }
  goPrevPage(){
    this.router.navigate(['/bk-menu-productos']);
  }
  

}