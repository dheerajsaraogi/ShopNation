import { Component, OnInit } from '@angular/core';
import {ProductService} from '../Services/product.service';
import { Product } from '../model/productModel';
import { Subscription} from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { CartService } from '../Services/cart.service';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  private productDescription:Product;
  private productDetails : Subscription;
  private productID:string;
  private prod:any;
  private routesub:Subscription;

  constructor(public productService:ProductService,private route: ActivatedRoute, private router: Router, public cartService: CartService) { }

  ngOnInit() {

    this.routesub = this.route.params.subscribe(params => {
      console.log("params",params);
      this.productID = params.productID;
    })

    this.productService.getProduct(this.productID)
    this.productDetails = this.productService.getProductDetailsListener().subscribe((productinfo:Product) => {
      this.productDescription = productinfo;
      console.log("Product info",productinfo)
     console.log("Product Description",this.productDescription)

    })
  
  }
  cart(title:string,category: string, description:string,price:string,imagePath:string){
    this.router.navigate(["/cart"]);
    //this.cartService = productDescription;
    this.cartService.addProduct(title, category, description, price, imagePath)
  }

  
}
