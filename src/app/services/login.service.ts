import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userMail: string;
  private tokenTimer:any;
  private isAuthenticated = false;
  private token:string;
  private authStatusListener = new Subject<boolean>();


  constructor(private router: Router,
    private http: HttpClient) { }




getAuthStatusListener(){
  return this.authStatusListener.asObservable();
}

  
getToken(){
  console.log("getToken Function",this.token)
  return this.token;
}

getIsAuth(){
  return this.isAuthenticated;
}

  userSignUp(user:any){
    this.userMail = user.username;
    localStorage.setItem("Email",this.userMail);
    console.log("Service sign up",this.userMail);

    this.http.post('http://localhost:1025/auth/signup',user).subscribe((responseData) => {
      console.log("Result :: " , responseData);
      const token = responseData["token"];
      this.token = token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      if(responseData["status"] == "success"){
           if (responseData["data"]["userType"] == "customer"){
           const Name =responseData["data"]["name"];
            this.router.navigate(['/dashboard', Name])
          }
      }
    });
  }

  userSignIn(user:any){
    this.userMail = user.username;
    console.log("userSignIn login",user)
    localStorage.setItem("Email",this.userMail);

    console.log("Service sign in",this.userMail);

    this.http.post('http://localhost:1025/auth/signin',user).subscribe((responseData) => {
      console.log("Result :: " , responseData);
      console.log("resulttttt",responseData)

      if(responseData["status"] == "success"){

        const token = responseData["token"];
        this.token = token;
        if(token){
          const expiresInDuration = responseData["expiresIn"];
          console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          console.log(expirationDate);
          this.saveAuthData(token,expirationDate)
  
          if(responseData["data"]["userType"] == "Manager"){
            this.router.navigate(['/admin'])

         }else if (responseData["data"]["userType"] == "customer"){
           const Name =responseData["data"]["name"];
           this.router.navigate(['/dashboard',Name])
         }
        }

        
      }
    });
  }



  getusername(){
    console.log("in login service",this.userMail);
    return this.userMail;
  }

  putusername(name: string){
    console.log("in putname",name)
    this.userMail = name;
  }

  autoAuthUser(){
    const authInformation =   this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/100);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
  
  private setAuthTimer(duration:number){
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }


private saveAuthData(token:string,expirationDate:Date){
  localStorage.setItem('token',token);
  localStorage.setItem('expiration',expirationDate.toISOString());
}

private clearAuthData(){
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("Email");
}

private getAuthData(){
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  if(!token || !expirationDate){
    return;
  }
  return {
    token:token,
    expirationDate: new Date(expirationDate)
  }
}


}