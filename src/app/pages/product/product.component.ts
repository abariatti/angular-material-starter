import { Product } from './../../models/products';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { ProductService } from '../../services/product.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any = {};
  displayedColumns = ['id', 'name', 'price', 'quantity'];
  products: Observable<Product[]>;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  private alive = true;

  constructor(private http: HttpClient,
    private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getAll().takeWhile(() => this.alive).subscribe(products => {
      this.dataSource.data = products;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onSubmit() {
    console.log(this.product);
    this.productService.create(this.product);
    this.getProducts();
  }
}
