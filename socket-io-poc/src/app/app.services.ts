import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
      public message$: BehaviorSubject<string> = new BehaviorSubject('');
      socket = io('http://localhost:3000');

    constructor(private http: HttpClient) { }
    public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
    };
    
	getMessage() {
		return this.http.get(
			'http://localhost:3000/api/message');
	}
}
