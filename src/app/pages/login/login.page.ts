import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  errorControls: any;
  loading:boolean= false;
  constructor(
    private formBuilder:FormBuilder,
    // private loginService: LoginService,
    private router:Router
  ) {
    this.form=this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
    this.errorControls = this.form.controls;

   }

  ngOnInit() {
  }

  login(){
    console.log("asdas")
    this.loading=true
  }
}
