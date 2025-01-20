import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl = environment.baseUrl;

  private categoryUrl = environment.categoryUrl;

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`;
    console.log(searchUrl);
    return this.getProducts(searchUrl);
  }
  getProductListPaginate(page: number, pageSize: number, currentCategoryId: number): Observable<GetResponseProducts> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`
    + `&page=${page}&size=${pageSize}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }
  searchProductsByPrice(price: number): Observable<Product[]> {
    const searchByPriceUrl: string = `${this.baseUrl}/search/findByUnitPriceLessThanEqual?price=${price}`;
    return this.getProducts(searchByPriceUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(`${searchUrl}`).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(`${this.categoryUrl}`).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }



}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
