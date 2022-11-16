import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bk-adicional-carga',
  templateUrl: './bk-adicional-carga.page.html',
  styleUrls: ['./bk-adicional-carga.page.scss'],
})
export class BkAdicionalCargaPage implements OnInit {
  form:FormGroup;
  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      idAdic: ['', Validators.required],
      descAdic:['', Validators.required] ,
      precioAdic: ['', Validators.required]
    })
  }

  redirectHome(){
    this.router.navigate(['/bk-menu-empleado']);
  }

  ngOnInit() {
  }

  async registrarAdicional(){
    const today = new Date();
    var adicId = this.form.controls.idAdic.value;
    var dataAdic = {
      descExtra: this.form.controls.descAdic.value,
    }
    var precioAdic = {
      fechaDesde: today,
      precioExtra: parseInt(this.form.controls.precioAdic.value)
    }

    await this.firestore.collection('extras').doc(adicId).set(dataAdic);

    await this.firestore.collection('extras').doc(adicId).collection('historial_precio').add(precioAdic);

    await this.router.navigate(['/bk-menu-productos']);
  }
  
  goPrevPage(){
    this.router.navigate(['/bk-menu-productos']);
  }
  

}