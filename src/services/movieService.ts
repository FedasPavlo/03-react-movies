import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

if (!TMDB_TOKEN) {
  console.warn('VITE_TMDB_TOKEN is not set. Add it to .env');
}

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN ?? ''}`,
    Accept: 'application/json',
  },
});

export async function fetchMovies(query: string, page = 1): Promise<TMDBResponse> {
  const params = {
    query,
    include_adult: false,
    page,
    language: 'en-US',
  };

  const response: AxiosResponse<TMDBResponse> = await axiosInstance.get('/search/movie', {
    params,
  });

  return response.data;
}