import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
  }

  getMovies(): void  {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Get favorite movies
  getFavoriteMovies(): void {
    this.fetchApiData.getFavorites().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday
      },
      width: '500px'
    });
  }
  
  // Check if a movie is a favorite
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  //add to favs
  addFavorites(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.addFavorites(movieId).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  //delete to favs
  deleteFavorites(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.deleteFavorites(movieId).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}