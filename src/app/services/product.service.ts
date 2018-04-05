import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>('/api/products');
    }

    getById(id: number) {
        return this.http.get('/api/products/' + id);
    }

    create(user: any) {
        return this.http.post('/api/products', user);
    }

    update(user: any) {
        return this.http.put('/api/products/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/products/' + id);
    }
}
