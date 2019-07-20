import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
move(){
  this.router.navigate(["/aboutUs"]);
}
Payment(){
  this.router.navigate(["/payment"]);
}
security(){
  this.router.navigate(["/security"]);
}
return(){
  this.router.navigate(["/return"]);
}
privacy(){
  this.router.navigate(["/privacy"]);
}
terms(){
  this.router.navigate(["/terms"]);
}

navtocontact(){
  this.router.navigate(["/contact"]);

}
}
