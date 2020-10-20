import { Component, OnInit, Input } from '@angular/core';
//importamos service
import { PostService } from '../../posts/post.service';
//importar interface
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
/*
  public post: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  } = {

    id: '1',
    titlePost: 'Post Descripcion',
    contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    imagePost: 'https://picsum.photos/id/237/200/300',
  }
*/
  //Guardar la busqueda


  //public posts$: Observable<PostI[]>;
  //Decorador Input para campturar el contenido que muestra de home.component.html
  @Input() post: PostI;
  //Inyectamos el service que acabanos de importar
  constructor(private postSvc: PostService) { }

  ngOnInit() {

    //this.postSvc.getAllPosts().subscribe(res => console.log('POST',res));
    //this.posts$ = this.postSvc.getAllPosts();

  }

}
