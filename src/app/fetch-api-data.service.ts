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
    /**
    * calls API endpoint to register a new user
    * @param userDetails
    * @returns a new user object in JSON format
    */
    public userRegistration(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(apiUrl + 'users/register', userDetails).pipe(
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to login an existing user
    * @param userDetails
    * @returns data of the user in JSON format
    */
    public userLogin(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to get data on all movies
    * @returns array of all movies in JSON format
    */
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

    /**
    * calls API endpoint to get data on a single movie specified by its title
    * @param title
    * @returns JSON object holding movie data
    */
    getMovie(title: any): Observable<any> {
      return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to get data on a director
    * @param name
    * @returns JSON obejct holding director data
    */
    getDirector(name: any): Observable<any> {
      return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to get data on a genre
    * @param name
    * @returns JSON obejct holding genre data
    */
    getGenre(name: any): Observable<any> {
      return this.http.get(apiUrl + 'genres/' + name, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to get data on a user
    * @returns JSON obejct holding user data
    */
    getUser(): Observable<any> {
      return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to get data on favorites list for a user
    * @returns JSON obejct holding list of favorites
    */
    getFavorites(): Observable<any> {
      return this.http.get(apiUrl + 'users/' + username + '/movies', {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to allow user to update their user information
    * @param userData
    * @returns JSON object holding data about the updated user
    */
    editUser(userData: any): Observable<any> {
      return this.http.put(apiUrl + 'users/' + username, userData, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to deregister an existing user
    * @returns	A success message indicating that the profile was successfully deleted.
    */
    deleteUser(): Observable<any> {
      return this.http.delete(apiUrl + 'users/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to delete a movie to the user's list of favorite movies
    * @param movieID
    * @returns JSON object holding data about the updated user
    */
    deleteFavorites(movieId: string): Observable<any> {
      return this.http.delete(apiUrl + 'users/' + username + '/favorites/' + movieId, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * calls API endpoint to add a movie to the user's list of favorite movies
    * @param movieID
    * @returns JSON object holding data about the updated user
    */
    addFavorites(movieId: string): Observable<any> {
      return this.http.patch(apiUrl + 'users/' + username + '/favorites/' + movieId, { Favorites: movieId },{headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
    * extracts response data from HTTP response
    * @param res
    * @returns response body or empty object
    */
    private extractResponseData(res: Response | Object): any {
      const body = res;
      return body || { };
    }

    /**
    * handles errors
    * @param error
    * @returns error message
    */
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
