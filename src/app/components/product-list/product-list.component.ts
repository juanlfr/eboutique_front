import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { PriceFilterService } from '../../services/price-filter.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {


  productList: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  searchPrice: number = 0;
  //pagination properties
  pageNumber: number = 0;
  pageSize: number = 3;
  totalElements: number = 0;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cartService: CartService,
              private priceFilterService: PriceFilterService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
    this.priceFilterService.rangeValue.subscribe(range => {
      this.searchPrice = range;
      if (this.searchPrice > 0) {
        console.log(`SearchPrice: ${this.searchPrice}`);
        this.getPriceFilterUpdated();
      }
    });
    
  }
  
  getPriceFilterUpdated() {
    this.productService.searchProductsByPrice(this.searchPrice).subscribe(
      data => {
        this.productList = data;
      }
    )
  }
  
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')!;
    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.handleProductList();
    }

  }
  handleSearchProduct() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.productList = data;
      }
    )
  }

  handleProductList() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    }

    //to reset the pageNumber to 1 if the category is different
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      data => {
        this.productList = data._embedded.products;
        this.totalElements = data.page.totalElements;
        //In spring pagination starts with 0 and in angular starts with 1
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        console.log(data);
      }
    )
  }
  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    let cartItem: CartItem = new CartItem(product);
    this.cartService.addTocart(cartItem);
  }

}
