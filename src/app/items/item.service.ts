import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, } from "rxjs";
import { Item } from "./item.model";

const APIURL = 'https://localhost:44321/api/TodoItems';

@Injectable()
export class ItemService {
    //Behaviour Subject hält den Value der mit allen Komponenten geteilt wird
    private _itemsSource = new BehaviorSubject<Item[]>([]);

    //Komponenten subscriben auf currentItems und bekommen dass BehaviorSubject ohne die Funktionalität den Value ändern zu können
    currentItems = this._itemsSource.asObservable();

    items: Item[] = []

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

        //CurrentItems bekommt hier seinen ersten Value
        this.getItems();
    }

    // Fetch Items von Endpoint und currentItems bekommt das Array
    getItems(): void {
        this.http.get<Item[]>(APIURL).subscribe(Response => {
            this.items = Response;
            this._itemsSource.next(this.items);
        });

    }

    addItem(description: string, isComplete: boolean) {
        var item = { description: description, isComplete: isComplete };
        this.http.post(APIURL, item).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    deleteItem(id: number): void {
        this.http.delete<Item>(APIURL + '/' + id).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    updateItem(id: number, item: Item) {
        this.http.put<Item>(APIURL + '/' + id, item).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    navigateHome(): void {
        this.router.navigate([''], { relativeTo: this.route });
    }

    
}