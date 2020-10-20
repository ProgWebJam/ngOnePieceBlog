import { Component, OnInit, Input } from '@angular/core';
//importar formulario reativos
import { FormGroup, FormControl, Validators } from '@angular/forms';
//interface
import { PostI } from '../../../shared/models/post.interface';
//service
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  //Propiedades imagen original y imagen para cambiar
  private image: any;
  private imageOriginal: any;

  //recivir la informacion que nos va a pasar modal
  @Input() post: PostI;

  //Inyectar nuestro service
  constructor(private postSvc: PostService) { }

  //instancia de los campos del formulario
  public editPostForm = new FormGroup({
    id: new FormControl('',Validators.required),
    titlePost: new FormControl('',Validators.required),
    contentPost: new FormControl('',Validators.required),
    tagsPost: new FormControl('',Validators.required),
    imagePost: new FormControl('',Validators.required),
  });

  ngOnInit() {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    //metodo llamado
    this.initValuesForm();
  }

  //Metodo editar
  editPost( post: PostI){

    console.log('Img', this.image);
    console.log('original', this.imageOriginal);

    //Condicion si imagen que se edita es igual a la original
    if( this.image === this.imageOriginal){
      this.post.imagePost = this.imageOriginal;
      //llamar metodo pasandole el post
      this.postSvc.editPostById(post);
    } 
    //de lo contrario si la imagen que tiene post editado es diferente
    else {
      //llama metodo pasandole post y image
      this.postSvc.editPostById(post, this.image);
    }

  }

  //metodo imagen
  handleImage(event:any): void {
    this.image = event.target.files[0];
  }

  //Metodo que va a asignar los valores que vengan desde el form editado
  private initValuesForm():void{
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    });
  }

}
