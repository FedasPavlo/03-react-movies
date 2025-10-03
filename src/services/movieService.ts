import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

export async function fetchMovies(query: string) {
  const params = { query, include_adult: false, language: 'en-US' };
  const response = await axiosInstance.get<TMDBResponse>('/search/movie', { params });
  return response.data;
}