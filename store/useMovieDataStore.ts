import { create } from 'zustand';
import { Movie } from '@/src/domain/entities/Movie';
import { MovieDetails } from '@/src/domain/entities/Movie';
import { SearchMoviesUseCase } from '@/src/domain/usecases/SearchMovies';
import { GetMovieDetailsUseCase } from '@/src/domain/usecases/GetMovieDetails';
import { MovieRepositoryImpl } from '@/src/data/repositories/MovieRepositoryImpl';

// Initialize repository and use cases
const movieRepository = new MovieRepositoryImpl();
const searchMoviesUseCase = new SearchMoviesUseCase(movieRepository);
const getMovieDetailsUseCase = new GetMovieDetailsUseCase(movieRepository);

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
      const data = await searchMoviesUseCase.execute(searchQuery);
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
      const data = await getMovieDetailsUseCase.execute(movieId);
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
