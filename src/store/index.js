import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { callAPI } from "./api";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    listLocations: state.listLocations,
  }),
});

export default new Vuex.Store({
  state: {
    getDetailWeatherLoading: false,
    getDetailWeatherResponse: {
      data: {},
    },
    getDetailWeatherError: {},
    getDetailWeatherStatus: 1,
    getListWeatherInfoLoading: false,
    getListWeatherInfoResponse: {
      data: [],
    },
    getListWeatherInfoError: {},
    getListWeatherInfoStatus: 1,
    getWeatherInfoLoading: false,
    getWeatherInfoResponse: {
      data: {},
    },
    getWeatherInfoError: {},
    getWeatherInfoStatus: 1,
    listLocations: [],
  },
  mutations: {
    setDetailWeatherLoading(state, payload) {
      state.getDetailWeatherLoading = payload;
    },
    setDetailWeatherResponse(state, payload) {
      state.getDetailWeatherResponse = payload;
      state.getDetailWeatherStatus = 1;
      state.getDetailWeatherLoading = false;
    },
    setDetailWeatherError(state, payload) {
      state.getDetailWeatherError = payload;
      state.getDetailWeatherStatus = 0;
      state.getDetailWeatherLoading = false;
    },
    setNewLocation(state, payload) {
      state.listLocations = state.listLocations.concat(payload);
    },
    setListWeatherInfoLoading(state, payload) {
      state.getListWeatherInfoLoading = payload;
    },
    setListWeatherInfoResponse(state, payload) {
      state.getListWeatherInfoResponse = payload;
      state.getListWeatherInfoStatus = 1;
      state.getListWeatherInfoLoading = false;
    },
    setListWeatherInfoError(state, payload) {
      state.getListWeatherInfoError = payload;
      state.getListWeatherInfoStatus = 0;
      state.getListWeatherInfoLoading = false;
    },
    setWeatherInfoLoading(state, payload) {
      state.getWeatherInfoLoading = payload;
    },
    setWeatherInfoResponse(state, payload) {
      state.getWeatherInfoResponse = payload;
      state.getWeatherInfoStatus = 1;
      state.getWeatherInfoLoading = false;
    },
    setWeatherInfoError(state, payload) {
      state.getWeatherInfoResponse = payload;
      state.getWeatherInfoStatus = 0;
      state.getWeatherInfoLoading = false;
    },
  },
  actions: {
    addLocation(context, payload) {
      const listLocations = context.state.listLocations;
      const checkLocation = listLocations.findIndex(
        (location) => location.location === payload.location
      );
      if (checkLocation === -1) {
        context.commit("setNewLocation", payload);
      }
    },
    getDetailWeather(context, payload) {
      context.commit("setDetailWeatherLoading", true);
      return callAPI("/get-weather-detail", "get", {
        lat: payload.lat,
        lon: payload.lon,
        exclude: "minutely,daily,hourly",
      })
        .then((res) => {
          context.commit("setDetailWeatherResponse", res.data);
        })
        .catch((err) => context.commit("setDetailWeatherError", err));
    },
    getListLocationWeatherInfo(context) {
      context.commit("setListWeatherInfoLoading", true);
      const list = context.state.listLocations;
      return callAPI(
        "/get-weather-list",
        "post",
        {
          list,
        },
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          context.commit("setListWeatherInfoResponse", res.data);
        })
        .catch((err) => context.commit("setListWeatherInfoError", err));
    },
    getWeatherInfo(context, payload) {
      context.commit("setWeatherInfoLoading", true);
      return callAPI("/get-weather", "get", {
        lat: payload.lat,
        lon: payload.lon,
      })
        .then((res) => {
          context.commit("setWeatherInfoResponse", res.data);
        })
        .catch((err) => context.commit("setWeatherInfoError", err));
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
