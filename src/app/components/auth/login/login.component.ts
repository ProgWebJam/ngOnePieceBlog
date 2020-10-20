import { Component, OnInit } from '@angular/core';
//importar service
import { AuthService } from '../../../shared/services/auth.service';
//importar interface
import { UserI } from '../../../shared/models/user.interface';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //inyectar service
  constructor(private authSvc: AuthService, private route: Router) { }

  //Crear Formulario
  loginForm = new FormGroup({
    //campo que necesitamos del formulario
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });

  ngOnInit() {
    /*
    //Test
    const user: UserI = {
      email: 'jmarulo@gmail.com',
      password: '987654'
    };
    //Llamar el login de nuestro service
    this.authSvc.loginByEmail(user);
    */
  }

  //Metodo Login
  onLogin(form: UserI){
    //Test
    //console.log('Form', form);
    this.authSvc
      .loginByEmail(form)
      .then(res=> {
        //test
        console.log('successfully', res);
        //Redirecionar a home usuario logiado
        this.route.navigate(['/']);
      })
      .catch(err => console.log('Error', err));

  }


}
