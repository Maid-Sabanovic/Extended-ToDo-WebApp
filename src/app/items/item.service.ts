import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Item } from "./item.model";

const API = 'https://localhost:44321/api/TodoItems';

@Injectable()
export class ItemService {
    //Behaviour Subject trägt den Value der mit allen Komponenten geteilt wird
    private _itemsSource = new BehaviorSubject([]);

    //Komponenten subscriben auf currentItems und bekommen dass BehaviorSubject ohne die Funktionalität den Value ändern zu können
    currentItems = this._itemsSource.asObservable();

    items: Item[] = []

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

        //CurrentItems bekommt hier seinen ersten Value
        this.getItems();
    }

    // Fetch Items von Endpoint und currentItems bekommt das Array
    getItems(): void {
        this.http.get<Item[]>(API).subscribe(Response => {
            this.items = Response;
            this._itemsSource.next(this.items);
        });

    }

    getItem(id: number) {
        this.http.delete<Item>('https://localhost:44321/api/TodoItems' + '/' + id)
    }

    updateItems(items: Item[]): void {

        //Die next() Methode wird aufgerufen und das Behavior Subject bekommt einen neuen Value
        this._itemsSource.next(items);

    }

    addItem(description: string, isComplete: boolean) {
        var item = { description: description, isComplete: isComplete };
        this.http.post('https://localhost:44321/api/TodoItems', item)
            .subscribe(Response => {
                this.getItems();
            });
        this.navigateHome();
    }

    deleteItem(id: number): void {
        this.http.delete<Item>('https://localhost:44321/api/TodoItems' + '/' + id).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    updateItem(id:number, item: Item) {
        this.http.put<Item>('https://localhost:44321/api/TodoItems' + '/' + id, item).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    navigateHome(): void {
        this.router.navigate([''], { relativeTo: this.route });
    }
}