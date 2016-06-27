System.register(['@angular/core', '@angular/common', '@angular/platform-browser-dynamic'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, platform_browser_dynamic_1;
    var Product, ProductImage, PriceDisplay, ProductDepartment, productRow, ProductsList, DemoFormSkuBuilder, ShopApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            }],
        execute: function() {
            // Product class
            Product = (function () {
                function Product(sku, name, imgUrl, dep, price) {
                    this.sku = sku;
                    this.name = name;
                    this.imgUrl = imgUrl;
                    this.dep = dep;
                    this.price = price;
                }
                return Product;
            }());
            ProductImage = (function () {
                function ProductImage() {
                }
                ProductImage = __decorate([
                    core_1.Component({
                        selector: 'product-image',
                        host: { class: 'ui small image' },
                        inputs: ['product'],
                        template: "<img class=\"product-image\" [src]=\"product.imgUrl\">"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductImage);
                return ProductImage;
            }());
            PriceDisplay = (function () {
                function PriceDisplay() {
                }
                PriceDisplay = __decorate([
                    core_1.Component({
                        selector: 'price-display',
                        inputs: ['price'],
                        template: "<div class=\"price-display\">${{price}}</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PriceDisplay);
                return PriceDisplay;
            }());
            ProductDepartment = (function () {
                function ProductDepartment() {
                }
                ProductDepartment = __decorate([
                    core_1.Component({
                        selector: 'product-department',
                        inputs: ['product'],
                        template: "\n <div class=\"product-department\">\n  <span *ngFor=\"let name of product.department; let i=index\">\n    <a href=\"#\">{{ name }}</a>\n    <span>{{i < (product.department.length-1) ? '>' : ''}}</span>\n  </span>\n </div>\n "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductDepartment);
                return ProductDepartment;
            }());
            productRow = (function () {
                function productRow() {
                }
                productRow = __decorate([
                    core_1.Component({
                        selector: "product-row",
                        inputs: ['product'],
                        host: { 'class': 'item' },
                        directives: [ProductImage, ProductDepartment, PriceDisplay],
                        template: "\n     <product-image [product]=\"product\"></product-image>\n     <div class=\"content\">\n       <div class=\"header\">{{ product.name }}</div>\n         <div class=\"meta\">\n           <div class=\"product-sku\">SKU #{{ product.sku }}</div>\n         </div>\n       <div class=\"description\">\n         <product-department [product]=\"product\"></product-department>\n       </div>\n     </div>\n     <price-display [price]=\"product.price\"></price-display>\n     "
                    }), 
                    __metadata('design:paramtypes', [])
                ], productRow);
                return productRow;
            }());
            // productlist Decorator
            ProductsList = (function () {
                function ProductsList() {
                    this.onProductSelected = new core_1.EventEmitter();
                }
                ProductsList.prototype.clicked = function (product) {
                    this.currentProduct = product;
                    this.onProductSelected.emit(product);
                };
                ProductsList.prototype.isSelected = function (product) {
                    if (!product || !this.currentProduct)
                        return false;
                    return product.sku === this.currentProduct.sku;
                };
                ProductsList = __decorate([
                    core_1.Component({
                        selector: 'products-list',
                        directives: [productRow],
                        inputs: ['productList'],
                        outputs: ['onProductSelected'],
                        template: "\n   <div class=\"ui items\">\n     <product-row\n       *ngFor=\"let p of productList\"\n       [product]=\"p\"\n       (click)=\"clicked(p)\"\n       [class.selected]=\"isSelected(p)\">\n     </product-row>\n   </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductsList);
                return ProductsList;
            }());
            //Form
            DemoFormSkuBuilder = (function () {
                function DemoFormSkuBuilder(fb) {
                    this.myForm = fb.group({
                        'sku': ['', common_1.Validators.required],
                        'price': ['']
                    });
                    this.sku = this.myForm.controls['sku'];
                    this.sku.valueChanges.subscribe(function (value) { console.log(value); });
                    this.myForm.find('price').valueChanges.subscribe(function (value) { console.log(value); });
                }
                DemoFormSkuBuilder.prototype.onSubmit = function (value) {
                    console.log('you submitted value: ', value);
                };
                DemoFormSkuBuilder = __decorate([
                    core_1.Component({
                        selector: 'demo-form-sku-builder',
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        template: "\n    <div class=\"ui raised segment\">\n    <h2 class=\"ui header\">Demo Form: Sku with Builder</h2>\n    <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit(myForm.value)\" class=\"ui form\">\n      <div class=\"field\"[class.error]=\"!sku.valid && sku.touched\">\n        <label for=\"skuInput\" >SKU</label>\n        <input type=\"text\" id=\"skuInput\" placeholder=\"SKU\"\n          [ngFormControl]=\"myForm.controls['sku']\">\n          <div *ngIf=\"!sku.valid\" class=\"ui error message\">SKU is invalid</div>\n          <div *ngIf=\"sku.hasError('required')\" class=\"ui error message\">SKU is required</div>\n      </div>\n      <div class=\"field\">\n        <label for=\"priceInput\">Price</label>\n        <input type=\"text\" id=\"priceInput\" placeholder=\"Price\"\n          [ngFormControl]=\"myForm.find('price')\"  [(ngModel)]=\"price\">\n      </div>\n      \n      <button type=\"submit\" class=\"ui button\">Submit</button>     \n    </form>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], DemoFormSkuBuilder);
                return DemoFormSkuBuilder;
            }());
            exports_1("DemoFormSkuBuilder", DemoFormSkuBuilder);
            // ShopApp Decorator
            ShopApp = (function () {
                function ShopApp() {
                    this.products = [
                        new Product('MYSHOES', 'Black Running Shoes', '/resources/images/products/black-shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 109.99),
                        new Product('NEATOJACKET', 'Blue Jacket', '/resources/images/products/blue-jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 238.99),
                        new Product('NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', ['Men', 'Accessories', 'Hats'], 29.99)
                    ];
                }
                ShopApp.prototype.productWasSelected = function (product) {
                    console.log('Product clicked: ', product);
                };
                ShopApp = __decorate([
                    core_1.Component({
                        selector: "shop-app",
                        directives: [ProductsList, DemoFormSkuBuilder],
                        template: "<div class=\"shop-app\">\n       <products-list\n         [productList]=\"products\"\n         (onProductSelected)=\"productWasSelected($event)\" >\n       </products-list>\n       <demo-form-sku-builder></demo-form-sku-builder>\n   </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ShopApp);
                return ShopApp;
            }());
            platform_browser_dynamic_1.bootstrap(ShopApp);
        }
    }
});
//# sourceMappingURL=shop.js.map