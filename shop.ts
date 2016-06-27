import {
  Component,
  EventEmitter
} from '@angular/core';
 import {
  FORM_DIRECTIVES,
  CORE_DIRECTIVES
  FormBuilder,
  ControlGroup,
  Validators,
  AbstractControl
  } from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';

// Product class
class Product {
  constructor (public sku: string,
     public name: string,
      public imgUrl: string,
       public dep: string[],
        public price: number){
  }
}


@Component({
  selector: 'product-image',
  host: {class: 'ui small image'},
  inputs: ['product'],
  template: `<img class="product-image" [src]="product.imgUrl">`
})
class ProductImage {
  product: Product;
}
@Component({
  selector: 'price-display',
  inputs: ['price'],
  template: `<div class="price-display">\${{price}}</div>`
})
class PriceDisplay{
  price: number;
}
@Component({
 selector: 'product-department',
 inputs: ['product'],
 template: `
 <div class="product-department">
  <span *ngFor="let name of product.department; let i=index">
    <a href="#">{{ name }}</a>
    <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
  </span>
 </div>
 `
 })
 class ProductDepartment{
   product: Product;
 }
 @Component({
   selector: `product-row`,
   inputs: ['product'],
   host:{'class': 'item'},
   directives: [ProductImage, ProductDepartment, PriceDisplay],
   template: `
     <product-image [product]="product"></product-image>
     <div class="content">
       <div class="header">{{ product.name }}</div>
         <div class="meta">
           <div class="product-sku">SKU #{{ product.sku }}</div>
         </div>
       <div class="description">
         <product-department [product]="product"></product-department>
       </div>
     </div>
     <price-display [price]="product.price"></price-display>
     `
 })
 class productRow {
   product: Product;
 }

 // productlist Decorator
 @Component({
   selector: 'products-list',
   directives: [productRow],
   inputs: ['productList'],
   outputs: ['onProductSelected'],
   template: `
   <div class="ui items">
     <product-row
       *ngFor="let p of productList"
       [product]="p"
       (click)="clicked(p)"
       [class.selected]="isSelected(p)">
     </product-row>
   </div>`
 })

 // productList

 class ProductsList{

     productList: Product[];

     onProductSelected: EventEmitter<Product>;

     currentProduct: Product;

     constructor(){
         this.onProductSelected = new EventEmitter();
     }

     clicked(product: Product): void {
       this.currentProduct = product;
       this.onProductSelected.emit(product);
     }

     isSelected(product: Product): Boolean{
       if(!product || !this.currentProduct) return false;

       return product.sku === this.currentProduct.sku;
     }

 }
 
 //Form
 @Component({
  selector: 'demo-form-sku-builder',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
    <div class="ui raised segment">
    <h2 class="ui header">Demo Form: Sku with Builder</h2>
    <form [ngFormModel]="myForm" (ngSubmit)="onSubmit(myForm.value)" class="ui form">
      <div class="field"[class.error]="!sku.valid && sku.touched">
        <label for="skuInput" >SKU</label>
        <input type="text" id="skuInput" placeholder="SKU"
          [ngFormControl]="myForm.controls['sku']">
          <div *ngIf="!sku.valid" class="ui error message">SKU is invalid</div>
          <div *ngIf="sku.hasError('required')" class="ui error message">SKU is required</div>
      </div>
      <div class="field">
        <label for="priceInput">Price</label>
        <input type="text" id="priceInput" placeholder="Price"
          [ngFormControl]="myForm.find('price')"  [(ngModel)]="price">
      </div>
      
      <button type="submit" class="ui button">Submit</button>     
    </form>
    </div>
  `
  })
  export class DemoFormSkuBuilder {
    myForm: ControlGroup;
    sku: AbstractControl;
    
    constructor(fb: FormBuilder) {
      this.myForm = fb.group({
        'sku': ['', Validators.required],
        'price': ['']
      });
      this.sku = this.myForm.controls['sku'];
      this.sku.valueChanges.subscribe((value: string) => {console.log(value)});
      this.myForm.find('price').valueChanges.subscribe((value: string) => {console.log(value)});

    }



    onSubmit(value: string): void {
      console.log('you submitted value: ', value);
    }
  }
 // ShopApp Decorator
 @Component({
   selector: `shop-app`,
   directives: [ProductsList,DemoFormSkuBuilder],
   template:
   `<div class="shop-app">
       <products-list
         [productList]="products"
         (onProductSelected)="productWasSelected($event)" >
       </products-list>
       <demo-form-sku-builder></demo-form-sku-builder>
   </div>`
 })
 // ShopApp class
 class ShopApp{
   products: Product[];

   constructor(){
     this.products = [
       new Product(
           'MYSHOES', 'Black Running Shoes',
           '/resources/images/products/black-shoes.jpg',
           ['Men', 'Shoes', 'Running Shoes'],
           109.99),
       new Product(
          'NEATOJACKET',
          'Blue Jacket',
          '/resources/images/products/blue-jacket.jpg',
          ['Women', 'Apparel', 'Jackets & Vests'],
          238.99),
       new Product(
           'NICEHAT',
           'A Nice Black Hat',
           '/resources/images/products/black-hat.jpg',
           ['Men', 'Accessories', 'Hats'],
           29.99)
     ];
   }

   productWasSelected(product: Product): void {
     console.log('Product clicked: ', product);
   }
 }


 bootstrap(ShopApp);
