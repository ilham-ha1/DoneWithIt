import { Movie, MovieDetails } from "../entities/Movie";

export interface MovieRepository {
  searchMovies(query: string): Promise<Movie[]>;
  getMovieDetails(movieId: string): Promise<MovieDetails>;
}
