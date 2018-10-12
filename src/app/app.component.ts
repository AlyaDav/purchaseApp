import { Component } from '@angular/core';

class Work{
    purchase: string;
    done: boolean;

    constructor(purchase: string) {
        this.purchase = purchase;
        this.done = false;
    }
}

class Item{
    purchase: string;
    done: boolean;
    works:Work[];


    constructor(purchase: string) {
        this.purchase = purchase;
        this.done = false;
        this.works =[];
    }
}

@Component({
    selector: 'purchase-app',
    //language=Angular2HTML
    template: `<div class="header">
                    <div class="font-italic" >
                            <div class="text-uppercase">
                                   <h1 class="text-center" >Список дел </h1>
                            </div>
                     </div>
    </div>
    
    <div class="form-inline">
            <div class="col-md-8">
               
               <input class="form-control" [(ngModel)]="textItem"  placeholder = "Название работы" />&#160;
                <button class="btn btn-default" (click)="addItem(textItem)"> <span class="glyphicon glyphicon-plus"></span> Добавить задание</button>&#160;
            </div>
    </div>
        
    <div class="panel" *ngFor="let item of items">
        
        <table class="table table-hover">
            <thead >
            <tr class="text-uppercase">
                <th class="text-center" >
                    <div  class="form-group">
                        &#160;&#160;{{item.purchase}}
                        <input class="form-control" *ngIf="showSelectedItemChange" [(ngModel)]="textWork" placeholder = "Переименование задачи" />&#160;&#160;
                        <input class="form-control" *ngIf="showSelectedWorkName" [(ngModel)]="textWork" placeholder = "Название подзадачи" />&#160;&#160;
                        <button class="btn btn-default" (click)="showItem(textWork, item, true)"><span class="glyphicon glyphicon-plus"></span>Добавить подзадачу</button>&#160;&#160;
                        <button class="btn btn-default" (click)="deleteItem(item)"> <span class="glyphicon glyphicon-minus"></span> Удалить </button>&#160;&#160;
                        <button class="btn btn-default" (click)="showItem(textWork, item, false)"><span class="glyphicon glyphicon-pencil"></span> Изменить задачу</button>&#160;&#160;
                        
                </div>
                </th>
            <tr>
            </thead>
        </table>
        
        <table >
            <tbody >
            <tr class="panel panel-success"   *ngFor="let work of item.works">
                <td>{{work.purchase}}</td>&#160;&#160;&#160;
                <td><input  type="checkbox" [(ngModel)]="work.done" /></td>&#160;&#160;&#160;
                <input *ngIf="showSelectedWork" class="form-control" [(ngModel)]="textWorkName" placeholder = "Переименование подзадачи" />&#160;&#160;
                <td><button class="btn btn-default" (click)="deleteWork(item,work)"><span class="glyphicon glyphicon-minus"></span>  Удалить подзадачу</button></td>&#160;&#160;
                <td><button class="btn btn-default" (click)="showWork(textWorkName, item, work)"><span class="glyphicon glyphicon-pencil"></span> Изменить подзадачу</button></td>&#160;&#160;
            </tr>
        
            </tbody>
        </table>
        
    </div>`
    })

export class AppComponent {
    showSelectedWork: boolean;

    showSelectedItemChange: boolean;
    showSelectedWorkName: boolean;
    textItem: string ='';
    textWork: string ='';
    textWorkName: string ='';
    items: Item[] =
        [
            {purchase: "1 задача", done: false, works:[{purchase: "1.1", done: false}, {purchase: "1.2", done: false}]},
            {purchase: "2 задача", done: false, works:[{purchase: "2.1", done: false}, {purchase: "2.2", done: false}]},
            {purchase: "3  задача", done: true,works:[{purchase: "3.1", done: false}, {purchase: "3.2", done: false}]},
            {purchase: "4 задача", done: false,works:[{purchase: "4.1", done: false}, {purchase: "4.2", done: false}]}
        ];

    constructor() {
        this.showSelectedItemChange=false;
        this.showSelectedWorkName=false;
        this.showSelectedWork = false;
    }

    addItem(text: string): void {

        if (text == null || text.trim() == "")
            return;
        this.items.push(new Item(text));
        this.textItem='';
            }

    showItem(text: string, item:Item, type:boolean) {
        if (type){
            this.showSelectedWorkName = true;
            this.addWork(text,item);
        }else {
            this.showSelectedItemChange = true;
            this.editItem(text,item);
        }

    }

    editItem(text: string, item:Item): void {
        let index: number = this.items.indexOf(item, 0);
        this.showSelectedItemChange = true;
        if (text == null || text.trim() == "")
            return;
        this.items[index].purchase=text;
        this.textWork='';
        this.showSelectedItemChange = false;
            }

    showWork(text: string, item:Item, work: Work) {
        this.showSelectedWork = true;
        this.editWork(text,item,work);
    }

    editWork(text: string, item:Item, work: Work): void {
        this.showSelectedWork = true;
        let index: number = this.items.indexOf(item, 0);
        let index1: number = this.items[index].works.indexOf(work, 0);

        if (text == null || text.trim() == "")
            return;
        this.items[index].works[index1].purchase=text;
        this.textWorkName='';
        this.showSelectedWork = false;
            }

    addWork(text: string, item:Item): void {

        if (item !== undefined && item !== null) {
            this.showSelectedWorkName =true;
            let index: number = this.items.indexOf(item, 0);
            console.log("addWork", index);
            if (index > -1) {
                if (text == null || text.trim() == "")
                    return;
                this.items[index].works.push(new Work(text));

                this.textWork=null;
                this.showSelectedWorkName = false;

            }
        }

    }

    deleteItem(item: Item): void {
        if (item !== undefined && item !== null) {
            let index: number = this.items.indexOf(item, 0);

            if (index > -1) {
                this.items.splice(index, 1)
            }
        }
    }
    deleteWork(item: Item, work: Work): void {
        if (item !== undefined && item !== null) {
            let index: number = this.items.indexOf(item, 0);
            let index1: number = this.items[index].works.indexOf(work, 0);

            if (index > -1) {
                this.items[index].works.splice(index1, 1)
            }
        }
    }
}