import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  //public appName = 'ngBlog';
  public logoOnePiece = 'https://i.postimg.cc/SXHjj1ts/onePiece.png';
 

  constructor(public authSvc: AuthService) { }

  ngOnInit() {}

  //Metodo Logout
  onLogout():void{
    this.authSvc.logout();
  }

}
