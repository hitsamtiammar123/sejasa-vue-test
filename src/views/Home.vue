<template>
  <v-app>
    <v-app-bar fixed :elevation="0" class="header">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="title d-flex flex-row justify-center">Indonesia</div>
    </v-app-bar>
    <v-navigation-drawer
      :width="sidebarHeight"
      class="sidebar"
      temporary
      v-model="drawer"
      app
    >
      <div class="content">
        <div class="d-flex flex-column title-container">
          <span class="t1">Current Location</span>
          <span class="t2 mt-4">
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">Indonesia</span>
          </span>
        </div>
        <div class="d-flex flex-column content-container">
          <router-link to="/location" class="t2 mt-4">
            <v-icon color="white">mdi-map-marker-plus</v-icon>
            <span class="ml-4">Add Location</span>
          </router-link>
          <router-link
            v-for="(location, index) in listLocationsLimit"
            :key="index"
            :to="`/detail?lat=${location.lat}&lng=${location.lng}&location=${location.location}`"
            class="t2 mt-4"
          >
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">{{ location.location }}</span>
          </router-link>
          <span v-if="listLocations.length > 4" class="t2 mt-4">
            <span>.... {{ listLocations.length - 4 }} more location</span>
          </span>
        </div>
      </div>
    </v-navigation-drawer>
    <v-main class="d-flex flex-column align-center main-content">
      <div class="main-container">
        <router-link
          :to="`/detail?lat=${location.lat}&lng=${location.lng}&location=${location.location}`"
          v-for="(location, index) in detailListLocation"
          :key="index"
          class="d-flex flex-column justify-space-between weather-item"
        >
          <div class="d-flex flex-row">
            <div class="d-flex flex-column flex-1">
              <h3>Chance of rain {{ location.pop }}%</h3>
              <h2 class="bold mt-3">{{ location.weather.description }}</h2>
            </div>
            <v-icon color="white" :size="90">{{
              getIcon(location.weather.id)
            }}</v-icon>
          </div>
          <span>
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">{{ location.location }}</span>
          </span>
          <div class="d-flex flex-row justify-content-between full-width">
            <h3>{{ location.temp }} F</h3>
            <span class="weather-description ml-4">
              <v-icon color="white">mdi-weather-hail</v-icon>
              <span class="ml-2">{{ location.humidity }}%</span>
            </span>
            <span class="weather-description ml-4">
              <v-icon color="white">mdi-weather-sunny</v-icon>
              <span class="ml-2">{{ location.uvi }}</span>
            </span>
            <span class="weather-description ml-4">
              <v-icon color="white">mdi-weather-windy</v-icon>
              <span class="ml-2">{{ location.wind_speed }} mp/h</span>
            </span>
          </div>
        </router-link>
      </div>
    </v-main>
    <loading-overlay :overlay="loading"></loading-overlay>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { getIcon as getIconHelper } from "../helper/index";
export default {
  name: "Home",
  data: () => ({
    drawer: false,
    overlay: false,
  }),
  mounted() {
    this.$store.dispatch("getListLocationWeatherInfo");
  },
  computed: {
    ...mapState({
      listLocations: (state) => state.listLocations,
      loading: (state) => state.getListWeatherInfoLoading,
      detailListLocation: (state) => state.getListWeatherInfoResponse.data,
    }),
    sidebarHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
        case "md":
          return "50%";
        case "xl":
        case "lg":
          return "30%";
      }
      return "30%";
    },
    listLocationsLimit() {
      return this.listLocations.slice(0, 4);
    },
  },
  methods: {
    getIcon(weatherId) {
      return getIconHelper(weatherId);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/globals.scss";
.main-content {
  margin-top: 70px;
  background: linear-gradient(
    205.22deg,
    #ffffff 1.45%,
    rgba(255, 255, 255, 0) 61.9%
  );
  .main-container {
    .weather-item {
      width: 100%;
      height: 324px;
      color: white;
      background: linear-gradient(
        180deg,
        #3cd18a 0%,
        #3c6fd1 0.01%,
        #7ca9ff 100%
      );
      border-radius: 20px;
      padding: 34px 22.7px 20px 22.42px;
      margin-bottom: 25px;

      .weather-description {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}

.sidebar {
  background: linear-gradient(180deg, #3cd18a 0%, #3c6fd1 0.01%, #7ca9ff 100%);
  & * {
    color: white;
  }
  .content {
    height: inherit;
    padding: 25px 21px;
    .title-container {
      .t1 {
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
      }
      .t2 {
        font-weight: bold;
        font-style: normal;
        font-size: 18px;
        line-height: 27px;
      }
    }

    .content-container {
      margin-top: 132px;
    }
  }
}
</style>
