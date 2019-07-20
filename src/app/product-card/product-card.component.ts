import { Component, OnInit } from '@angular/core';
import { ProductService} from '../Services/product.service';
import {Product} from '../model/productModel'
import { Subscription} from 'rxjs'
import { Router } from "@angular/router";
//import { CartService } from '../Services/cart.service';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  productDisplay: Product[] = [];
  private productSub : Subscription;
 
  constructor(public productService:ProductService,
    private router:Router) { }

  ngOnInit() {
    this.productService.getProducts();
    this.productSub = this.productService.getProductUpdateListener().subscribe((productDetails:Product[]) => {
      console.log("productDetails cards",productDetails);
      this.productDisplay = productDetails
    })
  }

  productDescription(productID:any){
  console.log(productID);

   this.productService.getProduct(productID)
   this.router.navigate(["/productDescription",productID])
   //this.cartService = productID
  }
}
