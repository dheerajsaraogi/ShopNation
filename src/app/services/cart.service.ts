import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, from } from "rxjs";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";


import { Product } from '../model/productModel'
import { LoginService } from './login.service';
//import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts:Product[] = [];
  private cartproduct:Product;
  private prodID:string = null;
  private cartproductUpdated = new Subject<Product[]>();
  // private cartproductdetailsUpdated = new Subject<any>();


  private product:any;

  constructor(private http:HttpClient,private router:Router,private loginService:LoginService) { }

  addProduct(title:string,category: string, description:string,price:string,imagePath:string)
  {
    const product: Product = { productID: null, title: title, category: category, description: description,price:price,imagePath:imagePath };
    this.http.post<{message:string;postId:string}>(
      "http://localhost:1025/cart/post",product
    ).subscribe(responseData => {

      const id = responseData.postId;
      product.productID = id;
      this.cartProducts.push(product);
      this.cartproductUpdated.next([...this.cartProducts]);
      
    })
  }

  getProducts(){
    this.http.get("http://localhost:1025/cart/getProduct")
    .pipe(
      map(productData => {
        return productData["products"].map(product => {
        console.log("getProducts",product)
          return {
            title:product.title,
            description:product.description,
            category:product.category,
            price:product.price,
            productID:product._id,
            imagePath:product.imagePath

          };
            
          
        });
      })
    )
    .subscribe(transformedProduct => {
      this.cartProducts = transformedProduct;
      this.cartproductUpdated.next([...this.cartProducts]);
    });
  }


  getcartProductUpdateListener(){
    return this.cartproductUpdated.asObservable();
  }


  generateMail(){
    console.log("In cart Service",this.loginService.getusername());
    this.product = localStorage.getItem("Email");
    console.log("inside generate mail",this.product)
    const userMail = {mail:this.product}
    this.http.post(
      "http://localhost:1025/cart/mail",userMail).subscribe(responseData =>{
        console.log(responseData);
      })

  }

  deleteCartItem(itemID:string){

    console.log("Cart Service ID",itemID);
   
    this.http.delete("http://localhost:1025/cart/" + itemID)
    .subscribe(() => {
      console.log("In deleteCartItem Service");
     const cartItemupdated = this.cartProducts.filter(cartItem => cartItem.productID !== itemID);
     this.cartProducts = cartItemupdated;
     this.cartproductUpdated.next([...this.cartProducts]);


    });

   console.log("Cart Service ID",itemID);

  }

  
}
