import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _ProductService:ProductService){}
  productsData:any[]=[]
  totalPrice:number = 0

  ngOnInit(): void {
    this.getUserCart()
  }

  getUserCart() {
     this._ProductService.getUserCart().subscribe({
      next: (res) => {
        this.productsData = res?.data;
        this.totalPrice = res?.totalPrice;
        }
    })
  }

  updateCartQuantity(quantity:number , productId:any) {
    const data = {
      productId: productId,
      quantity:quantity
      }
    this._ProductService.updateUserCart(data).subscribe({
      next: (res) => {
        this.getUserCart()

      }
    })
  }

  incrementCount(ele:HTMLElement , productId:any) {
    let quantity = Number(ele.innerText);
    quantity++;
    ele.innerText = `${quantity}`;

    this.updateCartQuantity(quantity , productId)

  }

  decrementCount(ele:HTMLElement , productId:any) {
    let quantity = Number(ele.innerText);
    if (quantity > 1) {
      quantity--;
    } else {
      quantity = 1;
    }

    ele.innerText = `${quantity}`;
    this.updateCartQuantity(quantity,productId)
  }

}
