import { Component, OnInit } from '@angular/core';
//importar formulario reativos
import { FormGroup, FormControl, Validators } from '@angular/forms';
//interface
import { PostI } from '../../../shared/models/post.interface';
//service
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  //propiedad para imagen
  private image:any
  //inyectar nuestro service
  constructor(private postSvc: PostService) { }

  //instancia del formulario
  public newPostForm = new FormGroup({
    //Campos que va a tener el formulario new
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });


  ngOnInit() {
  }

    //Metodo agregar post nuevo
    addNewPost(data: PostI){
      //prueba
      console.log('New post', data);
      this.postSvc.preAddAndUpdatePost(data, this.image);

    }

    //metodo subir imagen
    handleImage(event:any):void{
      this.image = event.target.files[0];
      //prueba
      console.log('Image', this.image);

    }

}
