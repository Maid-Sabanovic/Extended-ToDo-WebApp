import { Component, Injectable, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }


}
