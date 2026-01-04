import { MovieDetails } from "../entities/Movie";
import { MovieRepository } from "../repositories/MovieRepository";

export class GetMovieDetailsUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(movieId: string): Promise<MovieDetails> {
    return this.movieRepository.getMovieDetails(movieId);
  }
}
