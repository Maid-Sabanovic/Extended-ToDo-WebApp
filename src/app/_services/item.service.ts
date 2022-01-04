import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, Observable, } from "rxjs";
import { Item } from "../components/items/item.model";

const APIURL = 'https://localhost:44316/api/TodoItems';

@Injectable()
export class ItemService {

    /*
    * Holds the data for the itemlist
    * Components can subscribe to the observable to get the data
    */
    private _itemsSource = new BehaviorSubject<Item[]>([]);
    currentItems = this._itemsSource.asObservable();

    constructor(private http: HttpClient, private route: ActivatedRoute, 
        private router: Router, private oauthService: OAuthService) {

        //Retrieve items
        this.getItems();
    }

    // Method to call 'get' endpoint from API and assigning response to behavioursubject
    getItems(): void {
        this.http.get<Item[]>(APIURL).subscribe(Response => {
            this._itemsSource.next(Response);
        });

    }

    // Method to add (post) an item to the database 
    addItem(description: string, isComplete: boolean) {
        var item = { description: description, isComplete: isComplete };
        this.http.post(APIURL, item).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    // Method to delete an item from the database 
    deleteItem(id: number): void {
        this.http.delete<Item>(APIURL + '/' + id).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    // Method to update the selected item 
    updateItem(id: number, item: Item) {
        this.http.put<Item>(APIURL + '/' + id, item).subscribe(Response => {
            this.getItems();
        });
        this.navigateHome();
    }

    //Method for navigating to the home component
    navigateHome(): void {
        this.router.navigate(['/todolist'], { relativeTo: this.route });
    }

}