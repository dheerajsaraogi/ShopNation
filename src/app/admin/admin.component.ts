import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ProductService } from '../Services/product.service'
import { Product } from '../model/productModel'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  form: FormGroup;

  constructor(public productsService:ProductService,
    public route:ActivatedRoute) { }

  ngOnInit() {

   this.form = new FormGroup({
    title: new FormControl(null,{validators:[Validators.required]
    }),

    category: new FormControl(null,{validators:[Validators.required]
    }),
    
    price: new FormControl(null,{validators:[Validators.required]
    }),

    description:new FormControl(null,{validators:[Validators.required]
    }),

    imagePath:new FormControl(null,{validators:[Validators.required]
    }),

  });

  
  }

  onSaveProduct(){
    if(this.form.invalid){
      return;
    }

    this.productsService.addProduct(
      this.form.value.title,
      this.form.value.category,
      this.form.value.description,
      this.form.value.price,
      this.form.value.imagePath
    )
     
  }

}
