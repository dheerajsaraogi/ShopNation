import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userIsAuthenticated = false;
  private authListenerSubs:Subscription;

  constructor(public loginService: LoginService,
    public route: ActivatedRoute,
    public router: Router) { }
    name: string;

  ngOnInit() {

    

    this.route.paramMap.subscribe((paraMap)=>{
      if(paraMap.has('name')){
        this.name = paraMap.get('name');
        this.loginService.putusername(this.name);
      } else {
        this.name = this.loginService.getusername();
      }
    })
    this.userIsAuthenticated = this.loginService.getIsAuth();
    console.log("kaslksalks",this.userIsAuthenticated);
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe(isAuthenticated => {
      console.log("authhhh",isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
    })
  

  }
  nav(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
  tocart(){
    this.router.navigate(['/cart']);
  }
}
