import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public opened = false;
  public logoOnePiece = 'https://i.postimg.cc/SXHjj1ts/onePiece.png';

  constructor() { }

  ngOnInit() {
  }

}
