import { Product } from '../../models/products';
import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../services/product.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: any = {};
  public displayedColumns = ['id', 'name', 'price', 'quantity'];
  public products: Observable<Product[]>;
  public dataSource = new MatTableDataSource();

  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  private alive = true;

  constructor(
    private http: HttpClient,
    private productService: ProductService
    ) {}

  public ngOnInit(): void {
    this.getProducts();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public onSubmit(): void {
    alert(this.product);
    this.productService.create(this.product);
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getAll().takeWhile(() => this.alive).subscribe(products => {
      this.dataSource.data = products;
    });
  }
}
