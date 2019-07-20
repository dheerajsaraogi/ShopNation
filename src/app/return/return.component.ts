import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navtologin(){
    this.router.navigate(["/login"]);
}
}