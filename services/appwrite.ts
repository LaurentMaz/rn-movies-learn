import { Client, Databases, ID, Query } from 'react-native-appwrite';
// connexion to Appwrite
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// track searches made by users

/**
 * Updates the search count for a given movie based on the search query.
 *
 * - If a document with the specified search term already exists in the Appwrite database,
 *   increments its `count` field by 1.
 * - If no such document exists, creates a new document with the movie details and initializes
 *   the `count` field to 1.
 *
 * @param query - The search term used to find the movie.
 * @param movie - The movie object containing details such as title, id, and poster path.
 * @throws Will throw an error if the database operation fails.
 */
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        },
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        title: movie.title,
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
      console.log('movie added to database');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Retrieves the top 5 trending movies from the database, ordered by the 'count' field in descending order.
 *
 * @returns {Promise<TrendingMovie[] | undefined>} A promise that resolves to an array of trending movies,
 * or `undefined` if an error occurs during the fetch operation.
 *
 * @remarks
 * This function queries the database for documents in the specified collection,
 * limiting the results to 5 and ordering them by the 'count' field in descending order.
 * If an error occurs, it logs the error and returns `undefined`.
 */
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
