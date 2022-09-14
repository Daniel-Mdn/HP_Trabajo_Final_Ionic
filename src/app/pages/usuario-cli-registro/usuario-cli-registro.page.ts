import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-usuario-cli-registro',
  templateUrl: './usuario-cli-registro.page.html',
  styleUrls: ['./usuario-cli-registro.page.scss'],
})
export class UsuarioCliRegistroPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form:FormGroup;
  formAuth:FormGroup;
  errorControls:any;
  loading:boolean= false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder:FormBuilder,
    // private loginService: LoginService,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombres:['', Validators.required] ,
      fechaNac: ['', Validators.required],
      domiCalle: ['', Validators.required],
      domiNro: ['', Validators.required],
      domiPiso: ['', Validators.required],
      domiDpto: ['', Validators.required],
      domiObs: ['', Validators.required],
      domiProv: ['', Validators.required],
      domiLoc: ['', Validators.required]
    })
    this.formAuth = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
    })
    this.errorControls = this.form.controls;
   }

  ngOnInit() {
  }

  redirectLogin(){
    this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/login']);
  }

  registrarEmail(){
    this.modal.dismiss(null, 'cancel');
  }

}
