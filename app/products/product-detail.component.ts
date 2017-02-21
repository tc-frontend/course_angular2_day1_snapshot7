import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from './product';

@Component({
    templateUrl: 'app/products/product-detail.component.html'
})
export class ProductDetailComponent   {
    pageTitle: string = 'Product Detail';
    product: IProduct;
}
