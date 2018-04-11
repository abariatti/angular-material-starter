import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>('/parse/products');
    }

    getById(id: number) {
        return this.http.get('/parse/products/' + id);
    }

    create(product: any) {
        return this.http.post('/parse/products', product);
    }

    update(product: any) {
        return this.http.put('/parse/products/' + product.id, product);
    }

    delete(id: number) {
        return this.http.delete('/parse/products/' + id);
    }
}
