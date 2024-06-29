import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor( private _ToastrService:ToastrService , private _ProductService:ProductService ){}

  products:any[]=[]


  ngOnInit(): void {
    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.products = res.data;
        }
      })
  }
  handlAddToCard(e:MouseEvent , id:any) {
    e.preventDefault()
    const data = {
      productId: id,
      quantity:1
    }
    this._ProductService.addToCart(data).subscribe({
      next: (res) => {
        this._ToastrService.success("Product Added To Cart" , "Success")
      },
      error: (err) => {
        this._ToastrService.error(err , "Faild")
      }
    })
  }
}
