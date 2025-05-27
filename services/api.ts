export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3/',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

/**
 * Fetches a list of popular movies from the TMDB API.
 * If a query is provided, it searches for movies matching the query.
 * Otherwise, it returns movies sorted by popularity in descending order.
 *
 * @param {Object} params - The parameters for fetching movies.
 * @param {string} params.query - The search query for filtering movies.
 * @returns {Promise<any[]>} A promise that resolves to an array of movie results.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    // @ts-ignore
    throw new Error('Echec du chargement des films', response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      },
    );
    if (!response.ok) {
      // @ts-ignore
      throw new Error(
        'Echec du chargement des details du film',
        // @ts-ignore
        response.statusText,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
