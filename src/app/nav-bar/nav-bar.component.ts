import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs:Subscription;
  constructor(public router:Router,private loginService:LoginService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.loginService.getIsAuth();
    console.log("kaslksalks",this.userIsAuthenticated);
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe(isAuthenticated => {
      console.log("authhhh",isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
    })
  

  }
  navtologin(){
    this.router.navigate(['/login']);
  }

  navtocart(){
    this.router.navigate(['/cart']);

  }
  nav(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }

}
