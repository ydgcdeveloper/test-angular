import { selectProductsList } from './../../state/selectors/products.selector';
import { AppState } from './../../state/app.state';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products$: Observable<any> = new Observable();

  constructor(private store: Store<AppState>){
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsList);
  }

}
