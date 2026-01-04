import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SavedMovie {
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

interface MovieStore {
  savedMovies: SavedMovie[];
  isSaved: (id: number) => boolean;
  toggleSave: (movie: SavedMovie) => void;
  removeSaved: (id: number) => void;
  clearAll: () => void;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      savedMovies: [],

      isSaved: (id: number) => {
        return get().savedMovies.some(movie => movie.id === id);
      },

      toggleSave: (movie: SavedMovie) => {
        const { savedMovies, isSaved } = get();

        if (isSaved(movie.id)) {
          // Remove if already saved
          set({
            savedMovies: savedMovies.filter(m => m.id !== movie.id),
          });
        } else {
          // Add to saved
          set({
            savedMovies: [...savedMovies, movie],
          });
        }
      },

      removeSaved: (id: number) => {
        set({
          savedMovies: get().savedMovies.filter(m => m.id !== id),
        });
      },

      clearAll: () => {
        set({ savedMovies: [] });
      },
    }),
    {
      name: 'movie-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
