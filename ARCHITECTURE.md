# Clean Architecture Implementation

This project follows Clean Architecture principles with clear separation of concerns across three layers: Domain, Data, and Presentation.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                     │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │   React Native   │  │   Zustand Store  │          │
│  │    Components    │  │   (State Mgmt)   │          │
│  └──────────────────┘  └──────────────────┘          │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Domain Layer                       │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │    Entities      │  │   Use Cases      │          │
│  │   (Business      │  │   (Application   │          │
│  │    Logic)       │  │    Logic)        │          │
│  └──────────────────┘  └──────────────────┘          │
│  ┌──────────────────┐                                   │
│  │  Repository     │  ← Interface only                   │
│  │  Interfaces     │                                   │
│  └──────────────────┘                                   │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                        │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │   Repository    │  │   Data Sources   │          │
│  │  Implementations │  │  (API/DB etc)    │          │
│  └──────────────────┘  └──────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
src/
├── domain/                      # Domain Layer (Core business logic)
│   ├── entities/
│   │   └── Movie.ts           # Business entities
│   ├── repositories/
│   │   └── MovieRepository.ts  # Repository interfaces
│   └── usecases/
│       ├── SearchMovies.ts      # Use case: Search movies
│       └── GetMovieDetails.ts # Use case: Get movie details
│
├── data/                       # Data Layer (Data handling)
│   ├── repositories/
│   │   └── MovieRepositoryImpl.ts  # Repository implementation
│   └── datasources/
│       └── MovieRemoteDataSource.ts # Remote data source (TMDB)
│
├── components/                 # Presentation Layer (UI components)
│   ├── SearchBar.tsx
│   └── MovieCard.tsx
│
├── store/                     # State Management
│   ├── useMovieDataStore.ts    # Movies state (non-persistent)
│   └── useMovieStore.ts       # Saved movies (persistent)
│
├── services/                  # External services
│   ├── api.ts                # API configuration
│   └── appwrite.ts           # AppWrite integration
│
└── app/                       # Navigation & Screens
    ├── (tabs)/
    │   ├── index.tsx          # Home screen
    │   ├── search.tsx         # Search screen
    │   └── saved.tsx         # Saved movies screen
    └── movies/
        └── [id].tsx          # Movie details screen
```

## Layer Responsibilities

### Domain Layer (Core Business Logic)
- **Entities**: Core business objects (Movie, MovieDetails)
- **Use Cases**: Application-specific business rules
- **Repository Interfaces**: Abstractions for data access
- **No dependencies**: Independent of frameworks, UI, and databases

### Data Layer (Data Access)
- **Repository Implementations**: Concrete implementations of repository interfaces
- **Data Sources**: Handle actual data fetching from APIs, databases, etc.
- **Mapping**: Convert external data to domain entities
- **Depends on**: Domain layer only

### Presentation Layer (UI & State)
- **React Native Components**: UI rendering
- **Zustand Stores**: State management
- **Screens**: Page-level components
- **Depends on**: Domain layer (use cases), Data layer (repositories)

## Key Principles

### 1. Dependency Rule
- Source code dependencies can only point inward
- Domain layer has NO dependencies on other layers
- Data layer depends only on Domain layer
- Presentation layer depends on Domain and Data layers

### 2. Use Cases
- Each use case represents a single application business rule
- Encapsulates the interaction between entities and repositories
- Example: `SearchMoviesUseCase` handles the logic of searching and returning movies

### 3. Repository Pattern
- Interfaces defined in Domain layer
- Implementations in Data layer
- Allows easy swapping of data sources (e.g., API to local storage)

### 4. Factory Pattern
- Entity factory functions (`createMovie`, `createMovieDetails`)
- Converts raw API data to domain entities
- Computed properties included in factory functions
- Serialization-friendly for persistence

## Benefits

### Testability
- Each layer can be tested independently
- Easy to mock repositories for unit tests
- Use cases can be tested without UI

### Maintainability
- Clear separation of concerns
- Changes in one layer don't affect others
- Easy to locate and fix bugs

### Scalability
- Easy to add new features (new use cases)
- Simple to switch data sources
- Code grows organized, not chaotic

### Reusability
- Domain logic can be reused across different platforms
- Use cases can be shared between Web, iOS, Android
- Components can be reused with different data sources

## Usage Examples

### Searching Movies

```typescript
// In component
import { useMovieDataStore } from '@/store/useMovieDataStore';

const SearchScreen = () => {
  const { movies, fetchMoviesList, setSearchQuery } = useMovieDataStore();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchMoviesList(query);
  };

  // Render movies...
};
```

### Getting Movie Details

```typescript
// In component
import { useMovieDataStore } from '@/store/useMovieDataStore';

const MovieDetailScreen = ({ movieId }) => {
  const { movieDetail, fetchMovieDetail } = useMovieDataStore();

  useEffect(() => {
    fetchMovieDetail(movieId);
  }, [movieId]);

  // Render movie details...
};
```

### Saving Movies

```typescript
import { useMovieStore } from '@/store/useMovieStore';

const SaveButton = ({ movie }) => {
  const { toggleSave, isSaved } = useMovieStore();

  return (
    <Button onPress={() => toggleSave(movie)}>
      {isSaved(movie.id) ? 'Remove' : 'Save'}
    </Button>
  );
};
```

## Data Flow

```
User Action
    ↓
React Component (Presentation)
    ↓
Zustand Store (State Management)
    ↓
Use Case (Domain)
    ↓
Repository Implementation (Data)
    ↓
Data Source (Data)
    ↓
External API
    ↓
Response (reverse flow)
```

## Future Improvements

1. **Error Handling**: Implement comprehensive error handling with custom error types
2. **Caching**: Add caching layer in data sources
3. **Offline Support**: Add local data source for offline functionality
4. **Testing**: Add unit tests for use cases and repositories
5. **Validation**: Add input validation in use cases
6. **Logging**: Implement logging across all layers
7. **Pagination**: Add pagination support for large datasets
