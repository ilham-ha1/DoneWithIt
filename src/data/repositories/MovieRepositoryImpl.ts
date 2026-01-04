import { Movie, MovieDetails, createMovie, createMovieDetails } from "../../domain/entities/Movie";
import { MovieRepository } from "../../domain/repositories/MovieRepository";
import { TmdbMovieRemoteDataSource } from "../datasources/MovieRemoteDataSource";

export class MovieRepositoryImpl implements MovieRepository {
  private remoteDataSource: TmdbMovieRemoteDataSource;

  constructor(remoteDataSource?: TmdbMovieRemoteDataSource) {
    this.remoteDataSource = remoteDataSource || new TmdbMovieRemoteDataSource();
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const data = await this.remoteDataSource.fetchMovies(query);
    return data.map((item: any) => createMovie(item));
  }

  async getMovieDetails(movieId: string): Promise<MovieDetails> {
    const data = await this.remoteDataSource.fetchMovieDetails(movieId);
    return createMovieDetails(data);
  }
}
