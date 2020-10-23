import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public OnePiece = 'https://i.postimg.cc/7hJ1sqXd/about.jpg'

  constructor() { }

  ngOnInit() {
  }

}
