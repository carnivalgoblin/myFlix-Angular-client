import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'

// Declariong the api url that will provide data for the cleint app
const apiUrl = 'https://rpflixdb.herokuapp.com/';
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
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
    getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

    // Get one movie
    getMovie(title: any): Observable<any> {
      return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Get director
    getDirector(name: any): Observable<any> {
      return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Get genre
    getGenre(name: any): Observable<any> {
      return this.http.get(apiUrl + 'genres/' + name, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Get user
    getUser(user: any): Observable<any> {
      return this.http.get(apiUrl + 'users/' + user, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Get favorite movies for a user
    getFavorites(): Observable<any> {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return this.http.get(apiUrl + 'users/' + user + '/favorites/', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Edit user
    editUser(userData: any): Observable<any> {
      return this.http.put(apiUrl + 'users/' + username, userData, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Delete user
    deleteUser(): Observable<any> {
      return this.http.delete(apiUrl + 'users/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Delete movie from favorite movies
    deleteFavorites(movieId: string): Observable<any> {
      return this.http.delete(apiUrl + 'users/' + username + '/favorites/' + movieId, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Add movie from favorite movies
    addFavorites(movieId: string): Observable<any> {
      return this.http.patch(apiUrl + 'users/' + username + '/favorites/' + movieId, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Non-typed response extraction
    private extractResponseData(res: Response | Object): any {
      const body = res;
      return body || { };
    }

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
