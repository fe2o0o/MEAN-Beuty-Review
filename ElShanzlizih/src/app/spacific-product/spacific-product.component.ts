import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-spacific-product',
  templateUrl: './spacific-product.component.html',
  styleUrls: ['./spacific-product.component.css']
})
export class SpacificProductComponent implements OnInit  {
  constructor( private _ToastrService:ToastrService ,private _ActivatedRoute:ActivatedRoute,private _ProductService: ProductService) { }

  comment: string = '';
  count: number = 1;
  id: any;
  spacificProduct: any;


  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        this.id = res['id'];
      }
    })

    this.getSpacificProduct()

  }

  incrementCount() {
    this.count++;
  }

  decrementCount() {
    if (this.count > 1) {
      this.count--;
    } else {
      this.count = 1;
    }
  }

  getSpacificProduct() {
    this._ProductService.getSpacificProduct(this.id).subscribe({
      next: (res) => {
        this.spacificProduct=res.data
      }
    })
  }

  addComment(productId:any) {
    const addComment = {
      content: this.comment,
      productId:productId
    }

    this.comment=''

    this._ProductService.addComment(addComment).subscribe({
      next: (res) => {
        this._ToastrService.success('Comment Added' , 'Success')
        this.getSpacificProduct()
      }
    })
  }

  addToCart(id: any) {
    const data = {
      productId: id,
      quantity:this.count
    }
    this._ProductService.addToCart(data).subscribe({
      next: () => {
        this._ToastrService.success("Product Added To Cart" , "Success")
      },
      error: (err) => {
        this._ToastrService.error(err.message , "Faild")
      }
    })
  }

}
