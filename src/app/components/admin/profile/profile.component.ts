import { Component, OnInit } from '@angular/core';
//importar formulario reativos
import { FormGroup, FormControl, Validators } from '@angular/forms';
//interface
import { UserI } from './../../../shared/models/user.interface';
import { FileI } from './../../../shared/models/file.interface';
//service
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Crear 2 propiedades para la imagen
  public image: FileI;
  //si no tiene imagen se le asigna una imagen por defecto
  public currentImage = 'https://picsum.photos/id/113/150/150';

  //inyectar service AuthService
  constructor(private authSvc:AuthService) { }

  //Instancia Formulario
  public profileForm = new FormGroup({
    //Campo del formulario
    displayName: new FormControl('',Validators.required),
    //campo deshabilitado
    email: new FormControl({value:'', disabled: true }, Validators.required),
    photoURL: new FormControl('',Validators.required),

  });


  ngOnInit() {
    //usuario logiado, Llamar propiedad userData$ desde auth.service.ts
    this.authSvc.userData$.subscribe(user =>{
      this.initValuesForm(user);
      //prueba
      //console.log('user->',user);
    });
  }

  //Metodo Guardar
  onSaveUser(user:UserI): void{
    //Prueba
    //console.log('Save User');
    this.authSvc.preSaveUserProfile(user, this.image);
  }

  //traer datos del formulario
  private initValuesForm(user: UserI): void {
    //Condicion si tiene imagen
    if(user.photoURL){
      //asigne url de imagen a currentImage
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      //photoURL: user.photoURL,
    });
  }

  //metodo subir imagen
  handleImage(image: FileI):void{
    this.image = image;
  }


}
