import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@/src/domain/entities/Movie';

interface MovieStore {
  savedMovies: Movie[];
  isSaved: (id: number) => boolean;
  toggleSave: (movie: Movie) => void;
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

      toggleSave: (movie: Movie) => {
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
