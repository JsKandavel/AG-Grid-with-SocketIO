import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, CellValueChangedEvent, ColDef, GetRowIdParams, GridApi, GridReadyEvent, RowValueChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { ApiService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socket-io-poc';
  message: Object | undefined;
    private gridApi!: GridApi;

  //private socket: Socket;
    messageList: string[] = [];
  newMessage: string | undefined;
  updates: any[] = [];
  //getRowId:  any;

  constructor(private http: HttpClient, private apiService: ApiService) {
    //this.socket = io("http://localhost:3000");
    /* this.socket.on('connect', function(){
  console.log('Connected to Server')
 
}); */
  }
  ngOnInit() {
    this.apiService.getNewMessage().subscribe((message: string) => {

      
      this.messageList.push(message);
      if (this.messageList[0] == '')
        this.messageList.shift()
      if (this.messageList.length > 0) {
        this.updates =  this.messageList.map((data) => {
          return JSON.parse(data);
        })
      }
      //this.messageList = this.messageList.splice(0);
      this.gridApi?.applyTransaction({ update: this.updates })
      console.log(this.messageList, this.updates)
    })
     /* this.apiService.getMessage().subscribe(data => {
       this.message = data;
       console.log('message', this.message)
        }); */
    //this.getRowId = (params) => params.data.make;

  }
  getRowId(params: GetRowIdParams) {
    return params.data.id
  }
  sendMessage() {
    this.apiService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  public columnDefs: ColDef[] = [
   { field: 'make', editable: true},
   { field: 'model'},
   { field: 'price' }
 ];

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
   sortable: true,
   filter: true,
 };
 
 // Data that gets displayed in the grid
 public rowData$!: Observable<any[]>;

 // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
  
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    //this.rowData$
     this.gridApi.setRowData([
  {id:'1', "make": "Porsche", "model": "Boxter", "price": 72000 },
  {id:'2', "make": "Ford", "model": "Mondeo", "price": 32000 },
  {id:'3', "make": "Ford", "model": "Mondeo", "price": 32000 },
  {id:'4', "make": "Toyota", "model": "Celica", "price": 35000 },
  {id:'5', "make": "Toyota", "model": "Celica", "price": 35000 },
  {id:'6', "make": "Porsche", "model": "Boxter", "price": 72000 },
  {id:'7', "make": "Toyota", "model": "Celica", "price": 35000 },
  {id:'8', "make": "Toyota", "model": "Celica", "price": 35000 }])
      
      /* this.http
     .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json'); */
 }

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
   console.log('cellClicked', e);
 }

 // Example using Grid's API
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
  
  onRowValueChanged(event: RowValueChangedEvent) {
     var data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.make +
        ', ' +
        data.model +
        ', ' +
        data.price +
        ', ' +
        data.field5 +
        ')'
    );
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    var data = event.data;
    console.log(
      'onCellValueChanged: (' +
        data.make +
        ', ' +
        data.model +
        ', ' +
        data.price +
        ', ' +
        data.field5 +
        ')'
    );
    this.apiService.sendMessage(JSON.stringify(event.data));
    //this.socket.emit("goal:changes", event.data);
  }
}
