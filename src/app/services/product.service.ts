import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private alertService: AlertService) { }

    getAll() {
        return this.http.get<any[]>('/parse/classes/products');
    }

    getById(id: number) {
        return this.http.get('/parse/classes/products/' + id);
    }

    create(product: any) {
        return this.http.post('/parse/classes/products', product).subscribe(res => {
          this.alertService.success('successfully created product');
        }, err => {
          this.alertService.error(err.message);
        });
    }

    update(product: any) {
        return this.http.put('/parse/classes/products/' + product.id, product);
    }

    delete(id: number) {
        return this.http.delete('/parse/classes/products/' + id);
    }
}
