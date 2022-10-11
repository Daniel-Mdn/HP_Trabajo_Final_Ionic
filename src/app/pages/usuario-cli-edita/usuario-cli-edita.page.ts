import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/constants/interfaces';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-cli-edita',
  templateUrl: './usuario-cli-edita.page.html',
  styleUrls: ['./usuario-cli-edita.page.scss'],
})
export class UsuarioCliEditaPage implements OnInit {
  form: FormGroup;
  usuario: IUsuario;
  usuId: ''
  
  constructor(
    private firestore: AngularFirestore,
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private storage: StorageService,
    private router:Router,
  ) { 
    this.form = this.formBuilder.group({
      apellido: [''],
      nombre:[''],
      fechaNac: [''],
      nroTelefono: ['']
    })
  }

  ngOnInit() {
    //let usuId = '';
    this.storage.get('usuario').then((val)=>{ 
      this.usuId = val;
      //console.log('usuario: '+this.usuId);
      this.usuarioService.getUser(this.usuId).subscribe((usu)=>{
        //console.log(usu);
        this.usuario = usu;
        this.form.controls.apellido.setValue(this.usuario.apellido);
        this.form.controls.nombre.setValue(this.usuario.nombre);
        this.form.controls.fechaNac.setValue(this.usuario.fechaNac);
        this.form.controls.nroTelefono.setValue(this.usuario.nroTelefono);
      })
    });
  
    
   
    
  }

  editaUsuario(){
    console.log(this.usuario)
    var usuCliUpdated = {
      apellido: this.form.controls.apellido.value,
      nombre: this.form.controls.nombre.value,
      fechaNac: this.form.controls.fechaNac.value,
      nroTelefono: this.form.controls.nroTelefono.value,
    }
    this.usuarioService.updateUser(this.usuId, usuCliUpdated);
  }

  redirectInicio(){
    this.router.navigate(['/inicio']);
  }

}
