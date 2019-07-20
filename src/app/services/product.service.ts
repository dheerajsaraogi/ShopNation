import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";


import { Product } from '../model/productModel'
//import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products:Product[] = [];
  private product:Product;
  private prodID:string = null;
  private productUpdated = new Subject<Product[]>();
  private productdetailsUpdated = new Subject<any>();

  constructor(private http:HttpClient,private router:Router) { }

  addProduct(title:string,category: string, description:string,price:string,imagePath:string)
  {
    const product: Product = { productID: null, title: title, category: category, description: description,price:price,imagePath:imagePath };
   
    this.http.post<{message:string;postId:string}>(
      "http://localhost:1025/products/post",product
    ).subscribe(responseData => {

      const id = responseData.postId;
      product.productID = id;
      this.products.push(product);
      this.productUpdated.next([...this.products]);

    })
  }

    getProducts(){
      this.http.get("http://localhost:1025/products/getProduct")
      .pipe(
        map(productData => {
          return productData["result"].map(product => {
            return {
              _id:product._id,
              ProductSchema:product["ProductSchema"].map(opl => {
                return {
                  title:opl.title,
                  description:opl.description,
                  category:opl.category,
                  price:opl.price,
                  productID:opl._id,
                  imagePath:opl.imagePath
  
                };
              })
            }
          });
        })
      )
      .subscribe(transformedProduct => {
        this.products = transformedProduct;
        this.productUpdated.next([...this.products]);
      });
    }

  

    getProduct(prodID:string){
      return this.http.get<{message:string,product:Product}>("http://localhost:1025/products/getProductDetails/" + prodID).subscribe(productDetails => {
        this.product = productDetails.product 
        this.productdetailsUpdated.next(this.product);
    
        })
      
    }
   
  getProductDetailsListener(){
    return this.productdetailsUpdated.asObservable();
  }

  getProductUpdateListener(){
    return this.productUpdated.asObservable();
  }

}
