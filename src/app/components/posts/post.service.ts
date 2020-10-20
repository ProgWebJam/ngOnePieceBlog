import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionSequence } from 'protractor';
//importar interface file
import { FileI } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //propiedades imagen
  private filePath: any;
  //propiedad guardar url imagen
  private downloadURL: Observable<string>;

  //crear propiedad para acceder a la coleccion de post
  private postsCollection: AngularFirestoreCollection<PostI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    //('posts') = collecion como se llama desde el firebase
    this.postsCollection = afs.collection<PostI>('posts');

  }

  //Metodo para los posts del home
  public getAllPosts():Observable<PostI[]>{
    /*return this.afs.collection('posts')*/
    return this.postsCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        //recuperar todos los post y como firebase nos devuelve un objeto con un id y dentro el contenido
        //se esta interndo sobre eso para extraer los post y asociarlo a su id que le coresponde
        actions.map ( a => {
          const data = a.payload.doc.data() as PostI;
          const id = a.payload.doc.id;
          return { id, ...data};

        })
        )
    );
  }

  //metodo para la descripcion de cada post con su id
  public getOnePost(id:PostI):Observable<PostI>{
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }

  //Metodo delete
  public deletePostById(post:PostI){
    return this.postsCollection.doc(post.id).delete();
  }

  //Metodo Edit
  public editPostById(post:PostI, newImage?:FileI){
    //Si hay cambio de imagen
    if (newImage) {
      this.uploadImage(post, newImage);
    }
    //Si no hay cambio de imagen
     else {
      return this.postsCollection.doc(post.id).update(post);
    }

  }

  //Metodo intermedio entre agregar y subir imagen del post
  public preAddAndUpdatePost(post: PostI, image: FileI):void{

    this.uploadImage(post, image);

  }

  //Guardar post tanto nuevo como editar
  private savePost(post: PostI){
    console.log('PostSvc', post);
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost

    };

    if(post.id){
      return this.postsCollection.doc(post.id).update(postObj);
    } else {
      return this.postsCollection.add(postObj);
    }

    //La collecion postObj es la que se va a pasar en el firebase
    //this.postsCollection.add(postObj);
  }

  //Metodo subir imagen
  private uploadImage(post: PostI, image: FileI){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage =>{
            this.downloadURL = urlImage;
            console.log('URL_IMAGE', urlImage);
            console.log('POST', post);
            //Llama a metodo addPost()
            this.savePost(post);
          });

        })
      ).subscribe();

  }
}
