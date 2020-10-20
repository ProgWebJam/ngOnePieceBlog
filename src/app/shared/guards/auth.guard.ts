import { Injectable } from '@angular/core';
//Importar Router
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
//importar Service
import { AuthService } from './../services/auth.service';
//importar Observable
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //inyectar el service y Router
  constructor(private authSvc: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.userData$.pipe(
      map( user => {
        //condicion si el usuario no esta logiado
        if(!user){
          //redirecione a login
          this.router.navigate(['/login']);
          return false;
        }
        //de lo contrario ingresa a admin
        return true;
      })

    )
  }
  
}
