<template>
  <v-app>
    <v-app-bar fixed :elevation="0" class="header">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="title d-flex flex-row justify-center">Kec. Cimahi Tengah</div>
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
            <span class="ml-4">Kec. Cimahi Tengah</span>
          </span>
        </div>
        <div class="d-flex flex-column content-container">
          <span class="t2 mt-4">
            <v-icon color="white">mdi-map-marker-plus</v-icon>
            <span class="ml-4">Add Location</span>
          </span>
          <router-link to="/detail" class="t2 mt-4">
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">Kec. Antapani</span>
          </router-link>
          <span class="t2 mt-4">
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">Kec. Jayahaha</span>
          </span>
          <span class="t2 mt-4">
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">Kec. Cibaduyut</span>
          </span>
        </div>
      </div>
    </v-navigation-drawer>
    <v-main class="d-flex flex-column align-center main-content">
      <div class="main-container">
        <div
          v-for="i in 10"
          :key="i"
          class="d-flex flex-column justify-space-between weather-item"
        >
          <div class="d-flex flex-row">
            <div class="d-flex flex-column flex-1">
              <h3>Chance of rain 60%</h3>
              <h2 class="bold mt-3">Partly Cloudy</h2>
            </div>
            <v-icon color="white" :size="90">mdi-weather-partly-cloudy</v-icon>
          </div>
          <span>
            <v-icon color="white">mdi-map-marker</v-icon>
            <span class="ml-4">Kec. Cibaduyut</span>
          </span>
          <div class="d-flex flex-row justify-content-between full-width">
            <h3>72 F</h3>
            <span class="weather-description ml-4">
              <v-icon color="white">mdi-weather-hail</v-icon>
              <span class="ml-2">Kec. Cibaduyut</span>
            </span>
            <span class="weather-description ml-4">
              <v-icon color="white">mdi-weather-windy</v-icon>
              <span class="ml-2">124 mp/h</span>
            </span>
          </div>
        </div>
      </div>
    </v-main>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    drawer: false,
    overlay: false,
  }),
  computed: {
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
