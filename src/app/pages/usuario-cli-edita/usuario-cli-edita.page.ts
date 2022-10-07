import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/constants/interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-usuario-cli-edita',
  templateUrl: './usuario-cli-edita.page.html',
  styleUrls: ['./usuario-cli-edita.page.scss'],
})
export class UsuarioCliEditaPage implements OnInit {
  form: FormGroup;
  
  constructor(
    private firestore: AngularFirestore,
    private formBuilder:FormBuilder,
    private usuarios:UsuarioService,
    private storage: StorageService
  ) { 
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombre:['', Validators.required] ,
      fechaNac: ['', Validators.required],
      nroTel: ['', Validators.required]
    })
  }


  ngOnInit() {
    /*
    let usuario = '';
    this.storage.get('usuario').then((val) => {
      console.log(val);
    });
    this.usuarios.getUser(usuario)
    console.log("usuario:"+usuario)
    */
  }

}
