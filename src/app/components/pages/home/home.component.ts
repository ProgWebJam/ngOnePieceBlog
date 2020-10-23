import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { Observable } from 'rxjs';
import { PostI } from '../../../shared/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public currentImage = 'https://i.postimg.cc/bG5Skwdq/barco2.png';
  //public currentImage = 'https://i.postimg.cc/qNMNF33k/barco3.png';
  /*
  //propiedad del Post en un array
  public posts: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  }[] = [
  //llenamos el array
    {
    id: '1',
    titlePost: 'Post one',
    contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    imagePost: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: '2',
      titlePost: 'Post two',
      contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
      imagePost: 'https://picsum.photos/id/237/200/300',
      },
    {
      id: '3',
      titlePost: 'Post tree',
      contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
      imagePost: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: '4',
      titlePost: 'Post four',
      contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
      imagePost: 'https://picsum.photos/id/237/200/300',
    }


  ]
  */

  //declarar Propiedad posts$
  public posts$: Observable<PostI[]>;

  //Llamar service
  constructor(private postSvc: PostService) { }

  ngOnInit() {

    this.posts$ = this.postSvc.getAllPosts();

  }


}
