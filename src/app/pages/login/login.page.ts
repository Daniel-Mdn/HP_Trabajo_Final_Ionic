import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DomicilioService } from 'src/app/services/domicilio/domicilio.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  errorControls: any;
  loading: boolean = false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    // private loginService: LoginService,
    private router: Router,
    private storage: StorageService,
    private domicilioService: DomicilioService,
    private usuarioService: UsuarioService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.errorControls = this.form.controls;
  }
  ngOnInit() {}

  login() {
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.storage.set('usuario', email);
        this.usuarioService.getUser(email).subscribe((u) => {
          let usuario = u;
          this.storage.set('rol', usuario.rol);
          console.log(usuario.rol);
          switch (usuario.rol) {
            case 'usuario-cliente':
              this.domicilioService
                .getDomiciliosId({
                  where: [{ name: 'idUsuario', validation: '==', value: email }],
                })
                .subscribe((res) => {
                  console.log(res);
                  this.router.navigate(['/seleccion-domicilio']);
                });
              break
            case 'usuario-empleado':
              console.log('case usu-emp');
              this.router.navigate(['/bk-menu-empleado']);
              break
            case 'usuario-cadete':
              console.log('case usu-cad');
              this.router.navigate(['/bk-menu-empleado']);
              break
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  redirectUsuCliRegistro() {
    this.router.navigate(['/usuario-cli-registro']);
  }
}
