import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _ProductsUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this._ProductsUrl + 'products');
  }

  updateproduct(id: any, data: any) {
    return this.http.put(`${this._ProductsUrl}products/${id}`, data);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this._ProductsUrl}products/${id}`);
  }

  createProduct(data: any) {
    return this.http.post(`${this._ProductsUrl}products/create`, data);
  }
}
