export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  formattedReleaseYear: string;
  formattedRating: number;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  productionCompanies: {
    id: number;
    name: string;
    logoPath: string | null;
    originCountry: string;
  }[];
  homepage: string | null;
  status: string;
  tagline: string | null;
  imdbId: string | null;
  belongsToCollection: {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
  } | null;
  formattedRuntime: string;
  formattedBudget: string;
  formattedRevenue: string;
  genresList: string;
  productionCompaniesList: string;
}

export function createMovie(data: any): Movie {
  return {
    id: data.id,
    title: data.title,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    releaseDate: data.release_date,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    popularity: data.popularity,
    adult: data.adult,
    video: data.video,
    genreIds: data.genre_ids,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    formattedReleaseYear: data.release_date?.split("-")[0] || "N/A",
    formattedRating: Math.round(data.vote_average / 2),
  };
}

export function createMovieDetails(data: any): MovieDetails {
  return {
    id: data.id,
    title: data.title,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    releaseDate: data.release_date,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    popularity: data.popularity,
    adult: data.adult,
    video: data.video,
    genreIds: data.genre_ids,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    formattedReleaseYear: data.release_date?.split("-")[0] || "N/A",
    formattedRating: Math.round(data.vote_average / 2),
    runtime: data.runtime,
    budget: data.budget,
    revenue: data.revenue,
    genres: data.genres,
    productionCompanies: data.production_companies.map((c: any) => ({
      id: c.id,
      name: c.name,
      logoPath: c.logo_path,
      originCountry: c.origin_country,
    })),
    homepage: data.homepage,
    status: data.status,
    tagline: data.tagline,
    imdbId: data.imdb_id,
    belongsToCollection: data.belongs_to_collection,
    formattedRuntime: data.runtime ? `${data.runtime}m` : "N/A",
    formattedBudget: `$${(data.budget / 1_000_000).toFixed(1)} million`,
    formattedRevenue: `$${(data.revenue / 1_000_000).toFixed(1)} million`,
    genresList: data.genres?.map((g: any) => g.name).join(" • ") || "N/A",
    productionCompaniesList: data.production_companies
      ?.map((c: any) => c.name)
      .join(" • ") || "N/A",
  };
}
