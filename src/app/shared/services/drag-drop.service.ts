import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getColumns() {
    return this.http.get(this.url+"columns");

  }
    
    getData(data?): Observable<any> {
      let body = JSON.stringify(data );
      let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      let options =({ headers: headers });
    
      return this.http.post(this.url+"data", body, options)
    }
    

}
