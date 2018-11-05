import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private alertService: AlertService) { }

    public getAll(): Observable<Product[]> {
        return this.http.get<any>('/parse/classes/products')
          .pipe(map(res => res.results as Product[]));
    }

    public getById(id: number): Observable<Product> {
        return this.http.get('/parse/classes/products/' + id)
          .pipe(map(res => res as Product));
    }

    public create(product: Product): void {
        this.http.post('/parse/classes/products', product).subscribe(res => {
          this.alertService.success('successfully created product');
        }, err => {
          this.alertService.error(err.message);
        });
    }

    public update(product: Product): Observable<Product> {
        return this.http.put('/parse/classes/products/' + product.id, product)
          .pipe(map(res => res as Product));
    }

    public delete(id: number): void {
        this.http.delete('/parse/classes/products/' + id);
    }
}
