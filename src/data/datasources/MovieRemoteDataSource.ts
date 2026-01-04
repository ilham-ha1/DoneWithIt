import { TMDB_CONFIG } from "@/services/api";

export interface MovieRemoteDataSource {
  fetchMovies(query: string): Promise<any>;
  fetchMovieDetails(movieId: string): Promise<any>;
}

export class TmdbMovieRemoteDataSource implements MovieRemoteDataSource {
  async fetchMovies(query: string): Promise<any> {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  }

  async fetchMovieDetails(movieId: string): Promise<any> {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}
