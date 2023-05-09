import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../Models/icontact';
import { IGroup } from '../Models/igroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = 'http://localhost:9000/'; //json-server url

  constructor(private httpClient: HttpClient) { }

  //GET All Contact
  public getAllContacts(): Observable<IContact[]> {
    return this.httpClient.get<IContact[]>(`${this.serverUrl}contacts`)
      .pipe(catchError(this.handleError));
  }

  //GET Single Contact
  public getContact(contactId: string): Observable<IContact> {
    return this.httpClient.get<IContact>(`${this.serverUrl}contacts/${contactId}`)
      .pipe(catchError(this.handleError));
  }

  //ADD Contact
  public addContact(contact: IContact): Observable<IContact> {
    return this.httpClient.post<IContact>(`${this.serverUrl}contacts`, contact)
      .pipe(catchError(this.handleError));
  }

  //UPDATE Contact
  public updateContact(contact: IContact, contactId: string): Observable<IContact> {
    return this.httpClient.put<IContact>(`${this.serverUrl}contacts/${contactId}`, contact)
      .pipe(catchError(this.handleError));
  }

  //DELETE Contact
  public deleteContact(contactId: string): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.serverUrl}contacts/${contactId}`)
      .pipe(catchError(this.handleError));
  }

  //GET All Groups
  public getAllGroups(): Observable<IGroup[]> {
    return this.httpClient.get<IGroup[]>(`${this.serverUrl}groups`)
      .pipe(catchError(this.handleError));
  }

  //GET Single Group
  public getGroup(contact: IContact): Observable<IGroup> {
    return this.httpClient.get<IGroup>(`${this.serverUrl}groups/${contact.groupId}`)
      .pipe(catchError(this.handleError));
  }

  //Error Handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //Client Error
      errorMessage = `Error: ${error.error.message}`
    }
    else {
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

