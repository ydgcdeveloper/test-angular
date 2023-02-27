import { ROOT_REDUCERS } from './state/app.state';
import { productsReducer } from './state/reducers/products.reducer';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductComponent } from './component/product/product.component';
import { ProductUiComponent } from './component/product-ui/product-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductUiComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
