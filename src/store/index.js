import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
    imageBaseUrlOriginal: "https://image.tmdb.org/t/p/original",
    imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  },
  getters: {
    isFavorite: (state) => (id) => {
      return state.favorites.some((favorite) => favorite.id === id);
    },
    favorites: (state) => {
      return state.favorites;
    },
  },
  mutations: {
    setFavorites(state, payload) {
      state.favorites = payload;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    addToFavorites(state, payload) {
      state.favorites.push(payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFromFavorites(state, payload) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  actions: {
    setFavorites({ commit }, payload) {
      commit("setFavorites", payload);
    },
    addToFavorites({ commit }, payload) {
      commit("addToFavorites", payload);
    },
    removeFromFavorites({ commit }, payload) {
      commit("removeFromFavorites", payload);
    },
  },
  modules: {},
});
