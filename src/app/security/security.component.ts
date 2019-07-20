import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navtologin(){
    this.router.navigate(["/login"]);
}
}
