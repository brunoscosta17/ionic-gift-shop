import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonButton,
  IonCol,
  IonThumbnail,
  IonImg,
  IonCard, IonLabel, IonText, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { ApiService } from '../services/api/api.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonIcon, IonText, IonLabel, 
    IonImg,
    IonCol,
    IonButton,
    IonRow,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    IonCard
  ],
})
export class HomePage implements OnInit {
  items: Product[] = [];
  allItems: Product[] = [];
  api = inject(ApiService);
  query: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.allItems = this.api.items;
    this.items = [...this.allItems];
  }

  onSearchChange(event: any): void {
    this.query = event.detail.value.toLowerCase();
    this.querySearch();
  }

  querySearch(): void {
    this.items = [];
    if(this.query.length > 0) {
      this.searchItems();
    } else {
      this.items = [...this.allItems];
    }
  }

  searchItems(): void {
    this.items = this.api.items.filter((item: Product) => item.name.toLowerCase().includes(this.query));
  }
  
}
