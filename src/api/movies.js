/* eslint-disable no-useless-catch */
import api from "./index";

const movies = {
  async getPopularMovies(query) {
    try {
      const response = await api.request("/movie/popular", query);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getTopRatedMovies(query) {
    try {
      const response = await api.request("/movie/top_rated", query);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getMovieDetail(movieId, query) {
    try {
      const response = await api.request(`/movie/${movieId}`, query);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getSearchedMovies(query) {
    try {
      const response = await api.request("/search/movie", query);
      return response;
    } catch (error) {
      throw error;
    }
  }

};

export default movies;
