import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Importar Service
import { PostService } from '../post.service';
import { from, Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss']
})
export class DetailsPostComponent implements OnInit {

  public post$: Observable<PostI>;
  //Inyectar el service en nuestro constructor
  constructor(private route: ActivatedRoute, private postSvc: PostService){ }

  ngOnInit() {
    //en this.route.snapshot.params.id , el id viene de app-routing.module.ts en path: 'post/:id'
    //this.post.id = this.route.snapshot.params.id;

    //Llamar a nuestro metodo Postone para hacer la busqueda
    const idPost = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(idPost);
  }

}
