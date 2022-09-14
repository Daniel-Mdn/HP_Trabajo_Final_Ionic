import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuario-cli-registro',
  templateUrl: './usuario-cli-registro.page.html',
  styleUrls: ['./usuario-cli-registro.page.scss'],
})
export class UsuarioCliRegistroPage implements OnInit {
  form:FormGroup;
  errorControls:any;
  loading:boolean= false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder:FormBuilder,
    // private loginService: LoginService,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
    this.errorControls = this.form.controls;
   }

  ngOnInit() {
  }

}
