import { Movie } from "../entities/Movie";
import { MovieRepository } from "../repositories/MovieRepository";

export class SearchMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(query: string): Promise<Movie[]> {
    if (!query.trim()) {
      return [];
    }
    return this.movieRepository.searchMovies(query);
  }
}
