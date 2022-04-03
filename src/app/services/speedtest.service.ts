import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeedtestService {

  constructor(private http: HttpClient) { }
  Download(filename: string): Observable<HttpEvent<any>>{
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, {responseType: 'arraybuffer', reportProgress: true, observe: "events"});
  }
}
