import { fetchMovieDetails, fetchMovies } from '@/services/api';
import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDataStore {
  // Movie list state
  movies: Movie[];
  moviesLoading: boolean;
  moviesError: Error | null;
  searchQuery: string;

  // Movie detail state
  movieDetail: MovieDetails | null;
  movieDetailLoading: boolean;
  movieDetailError: Error | null;
  currentMovieId: string | null;

  // Actions for movie list
  fetchMoviesList: (query?: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearMovies: () => void;

  // Actions for movie detail
  fetchMovieDetail: (movieId: string) => Promise<void>;
  clearMovieDetail: () => void;
}

export const useMovieDataStore = create<MovieDataStore>((set, get) => ({
  // Initial state
  movies: [],
  moviesLoading: false,
  moviesError: null,
  searchQuery: '',

  movieDetail: null,
  movieDetailLoading: false,
  movieDetailError: null,
  currentMovieId: null,

  // Movie list actions
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  fetchMoviesList: async (query?: string) => {
    const searchQuery = query || get().searchQuery;

    set({
      moviesLoading: true,
      moviesError: null,
      searchQuery: searchQuery,
    });

    try {
      const data = await fetchMovies({ query: searchQuery });
      set({
        movies: data,
        moviesLoading: false,
      });
    } catch (error) {
      set({
        moviesError: error instanceof Error ? error : new Error('Failed to fetch movies'),
        moviesLoading: false,
      });
    }
  },

  clearMovies: () => {
    set({
      movies: [],
      moviesError: null,
      searchQuery: '',
      moviesLoading: false,
    });
  },

  // Movie detail actions
  fetchMovieDetail: async (movieId: string) => {
    set({
      movieDetailLoading: true,
      movieDetailError: null,
      currentMovieId: movieId,
    });

    try {
      const data = await fetchMovieDetails(movieId);
      set({
        movieDetail: data,
        movieDetailLoading: false,
      });
    } catch (error) {
      set({
        movieDetailError: error instanceof Error ? error : new Error('Failed to fetch movie details'),
        movieDetailLoading: false,
      });
    }
  },

  clearMovieDetail: () => {
    set({
      movieDetail: null,
      movieDetailError: null,
      movieDetailLoading: false,
      currentMovieId: null,
    });
  },
}));
