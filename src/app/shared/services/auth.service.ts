import { Injectable } from '@angular/core';
//Importar Interface user
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FileI } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Obtener los datos del usuario que esta autenticado
  public userData$: Observable<firebase.User>;

  //propiedades imagen
  private filePath: string;

  //Inyectamos nuestro AngularFireAuth a nuestro constructor
  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.userData$ = afAuth.authState;
  }

  //Metodo para que los usuarios se puedan logiar
  loginByEmail(user: UserI){
    const { email, password } = user;
    //Una Promesa
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      /*
      .signInWithEmailAndPassword(email, password)

      .then(res=> {
        //test
        console.log('successfully', res);
      })
      .catch(err => console.log('Error', err));
      */
  }

  //Metodo Logout
  logout(){
    this.afAuth.auth.signOut();
  }

  //intermedio para guardar imagen
  preSaveUserProfile(user:UserI, image?:FileI): void {
    if (image) {
      this.uploadImage(user,image);
    } else {
      this.saveUserProfile(user);
    }


  }

  //subir imagen
  private uploadImage(user:UserI, image:FileI) : void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage =>{
            user.photoURL = urlImage;
            //Llama a metodo addPost()
            this.saveUserProfile(user);
          });
        })
      ).subscribe();


  }
  //metodo guardar usuario
  private saveUserProfile(user:UserI){
    //console.log('User->', user);
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
    .then(() => console.log('User updated'))
    .catch(err => console.log('Error', err));

  }
}
