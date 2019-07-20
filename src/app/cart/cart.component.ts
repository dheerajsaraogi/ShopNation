import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import {Product} from '../model/productModel'
import { Subscription} from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from '../Services/cart.service';
import { LoginService } from '../Services/login.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userIsAuthenticated = false;
  private authListenerSubs:Subscription;

  productDisplay: Product[] = [];
  private productSub : Subscription;
  sum:number=0;
  add:number=0;
  price: string
  constructor(public cartService:CartService,public loginService:LoginService,
    private router:Router,
    private route: ActivatedRoute, public http: HttpClient) { }
  name: string;
  arrayLength:number=0;
  ngOnInit() {

    this.userIsAuthenticated = this.loginService.getIsAuth();
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe(isAuthenticated => {
      console.log("authhhh",isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
     
    })

    this.cartService.getProducts();
    this.productSub = this.cartService.getcartProductUpdateListener().subscribe((productDetails:Product[]) => {
      this.productDisplay = productDetails
      this.arrayLength = this.productDisplay.length;
      console.log("cart display product array",this.productDisplay)
    })
  }

   calc(){
     var add =0;
     var sum =0;
     this.productDisplay.forEach(function(element){
       console.log("in loop",element,parseFloat(element.price))
       var StartNumber = element.price;
       var ReplacedNumber = StartNumber.replace(/\,/g,'');
       var Amt = ReplacedNumber.replace(/\₹/g,'');
       add=parseInt(Amt);
       console.log(add, typeof(add))
       sum = sum + add;     
    
     })
     this.sum = sum;
    }


   mailOrder(){
       this.cartService.generateMail();
    }

    deleteItem(productId:string){
      this.cartService.deleteCartItem(productId);
    }

   

}


