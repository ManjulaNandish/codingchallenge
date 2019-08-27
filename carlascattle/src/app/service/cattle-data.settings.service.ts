import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CattleData } from '../model/cattle.data';

@Injectable({
  
    providedIn: 'root'
  
  })
  
  
  export class CattleDataSettingsService {
    url = './assets/data.json';
     constructor(private http: HttpClient) {
          this.getJSON().subscribe(data => {
              
          });
      }
  
      public getJSON(): Observable<CattleData[]> {
          return this.http.get<CattleData[]>(this.url);
      }
  }