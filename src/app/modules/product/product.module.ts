import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../modules/app-material/app-material.module';
import { ProductService } from '../../services/product.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
