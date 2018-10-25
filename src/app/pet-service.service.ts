import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IPet } from './pet';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetServiceService {

  private _url: string = "/assets/data/pets.json"
  newPet: IPet = {id: 10, name: "Patches", birthday: "2017-11-17T08:34:32", species: "cat", race: "Ragdoll", vac1: true, vac2: false, vac3: true};
  constructor(private http: HttpClient) { }

  getPets(): Observable<IPet[]>{
    return this.http.get<IPet[]>(this._url);
  }

  postPet(): Observable<IPet>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<IPet>(this._url, this.newPet, httpOptions);
    // get<IPet[]>(this._url);
  }
  
}
