import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'

// Declariong the api url that will provide data for the cleint app
const apiUrl = 'https://rpflixdb.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
// Inject the HttpClient module to the constructor params
// This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { 
    }
    // Making the api call for the user registration endpoint
    public userRegistration(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(apiUrl + 'users/register', userDetails).pipe(
        catchError(this.handleError)
      );
    }

    // Making the api call for the user login endpoint
    public userLogin(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
    }

    // Get all movies

    // Get one movie

    // Get director

    // Get genre

    // Get user

    // Get favorite movies for a user

    // Edit user

    // Delete user

    // Delete movie from favorite movies

    private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error(
          `Error Status code ${error.status}, ` + 
          `Error body is: ${error.error}`
        );
      }
      return throwError(
        'Something bad happened; please try again later'
      );
    }
  }
