import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './Client';

@Injectable({
  providedIn: 'root'
})
export class SubmitFormService {

  _url="http://localhost:3200/clientInfo";
  constructor(private _http : HttpClient) { }

  sendEmail(client : Client){
   return  this._http.post<any>(this._url, client);
  }
}
