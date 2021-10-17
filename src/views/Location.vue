<template>
  <v-app>
    <v-app-bar absolute :elevation="0" class="header header-location">
      <div class="d-flex flex-column full-width content-wrapper mt-16">
        <div class="d-flex full-width flex-row">
          <v-app-bar-nav-icon @click="$router.back()">
            <v-icon color="#363B64">mdi-chevron-left</v-icon>
          </v-app-bar-nav-icon>
          <div class="title d-flex flex-row justify-center align-center">
            Change Location
          </div>
        </div>
        <div class="input-container">
          <v-text-field
            v-model="textValue"
            @change="onTextType"
            prepend-icon="mdi-magnify"
            height="60px"
            class="input-text"
            label="Enter City"
          >
          </v-text-field>
        </div>
      </div>
    </v-app-bar>
    <l-map :zoom="zoom" :center="center" ref="map" class="map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="center" :icon="icon"></l-marker>
    </l-map>
    <v-bottom-sheet class="hehe" v-model="sheet">
      <v-sheet attach class="bottom-sheet" height="200px">
        <div class="d-flex flex-column bottom-container">
          <div class="d-flex flex-row justify-space-between heading">
            <div class="d-flex flex-row">
              <v-icon color="#363B64" :size="20">mdi-map-marker</v-icon>
              <div class="d-flex flex-column ml-5 title-container">
                <span class="t1">{{ district }}</span>
                <span class="t2">{{ province }}, {{ country }}</span>
              </div>
            </div>
            <div class="d-flex flex-row align-center weather-container">
              <v-icon color="#363B64" :size="30">{{ weatherIcon() }}</v-icon>
              <span class="t1 ml-3"
                >{{ weatherInfo.main && weatherInfo.main.temp }}°</span
              >
            </div>
          </div>
          <div class="d-flex flex-row justify-space-between description mt-5">
            <div class="d-flex flex-column title-container">
              <span class="t2">Longitude and latitude</span>
              <span class="t3">{{ center.lng }}, {{ center.lat }} </span>
            </div>
            <div class="d-flex flex-column title-container">
              <span class="t2">wind</span>
              <span class="t3"
                >{{ weatherInfo.wind && weatherInfo.wind.speed }} mp/h</span
              >
            </div>
          </div>
          <v-btn
            @click="onLocationAdded"
            class="my-5"
            block
            rounded
            color="primary"
            dark
          >
            Change Location
          </v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <loading-overlay :overlay="loading"></loading-overlay>
  </v-app>
</template>
<script>
import { latLng, icon } from "leaflet";
import { mapState } from "vuex";
import { getIcon, getGoogleMapScript } from "../helper/index";
import pinLocation from "@/assets/pin-location.png";

export default {
  name: "Location",
  data() {
    return {
      icon: icon({
        iconUrl: pinLocation,
      }),
      country: "",
      province: "",
      district: "",
      sheet: false,
      currLocationHasLoaded: false,
      zoom: 13,
      textValue: "",
      center: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  created() {
    const resultScript = getGoogleMapScript();
    resultScript.onload = () => {
      this.getCurrentLocation();
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.bindClickEventOnMap();
      this.getCurrentLocation();
    });
  },
  updated() {
    // if (this.status === 1) {
    //   console.log("Masuk hehe", this.weatherInfo);
    //   this.sheet = true;
    // }
  },
  computed: {
    ...mapState({
      weatherInfo: (state) => state.getWeatherInfoResponse.data,
      loading: (state) => state.getWeatherInfoLoading,
      status: (state) => state.getWeatherInfoStatus,
    }),
  },
  methods: {
    weatherIcon() {
      if (this.weatherInfo && Array.isArray(this.weatherInfo?.weather)) {
        return getIcon(this.weatherInfo.weather[0].id);
      }
      return "";
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const lotLan = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.currLocationHasLoaded = true;
        this.getLocation({
          location: lotLan,
        });
      });
    },
    onLocationAdded() {
      const newLocation = {
        lng: this.center.lng,
        lat: this.center.lat,
        location: this.district || `${this.country} - ${this.province}`,
      };
      this.$store.dispatch("addLocation", newLocation);
      this.$router.push("/");
    },
    onTextType() {
      this.getLocation({
        address: this.textValue,
      });
      this.textValue = "";
    },
    bindClickEventOnMap() {
      const mapObj = this.$refs.map.mapObject;
      mapObj.on("click", (e) => {
        this.getLocation({
          location: {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
        });
      });
    },
    getLocation(params) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(params).then((result) => {
        const currentLocationG = result.results[0];
        // this.sheet = true;
        this.fetchLocationDetail(currentLocationG);
      });
    },
    fetchLocationDetail(locationContext) {
      const countryD = locationContext.address_components.find(
        (d) => d.types[0] === "country"
      );
      const provinceD = locationContext.address_components.find(
        (d) => d.types[0] === "administrative_area_level_1"
      );
      const districtD = locationContext.address_components.find(
        (d) => d.types[0] === "administrative_area_level_3"
      );
      const location = locationContext.geometry.location;
      this.center = latLng(location.lat(), location.lng());
      if (countryD) {
        this.country = countryD.long_name;
      } else {
        this.country = "-";
      }

      if (provinceD) {
        this.province = provinceD.short_name;
      } else {
        this.province = "-";
      }

      if (districtD) {
        this.district = districtD.short_name;
      } else {
        this.district = "-";
      }
      this.$store
        .dispatch("getWeatherInfo", {
          lat: location.lat(),
          lon: location.lng(),
        })
        .then(() => {
          this.sheet = true;
          //console.log("weather info success", this.weatherInfo);
        });
    },
  },
  watch: {
    getWeatherInfoStatus: (status, prevStatus) => {
      console.log({ status, prevStatus });
      if (status !== prevStatus) {
        console.log("Status hehe", status);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/globals.scss";
.header-location {
  background: #eee !important;
  min-height: 150px;

  & * {
    color: #363b64;
  }

  .content-wrapper {
    padding: 4px 16px;
  }

  .input-container {
    .input-text {
      @include directionX;
      align-items: center;
      min-height: 40px;
      background-color: white;
      border-radius: 500px;
      padding: 0px 16.67px;
    }
  }

  .title {
    width: 100% !important;
  }
}

.map {
  height: calc(100% - 150px);
  width: 100%;
  margin-top: 150px;
  overflow: hidden;
  z-index: 0;
}

.bottom-sheet {
  @include directionY;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 26px;
  width: 100%;
  min-height: 239px;

  .bottom-container {
    @media (max-width: 769px) {
      width: 100%;
    }
    width: 60%;

    .title-container {
      .t1 {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #363b64;
      }
      .t2 {
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
        color: #a098ae;
      }
      .t3 {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
      }
    }

    @mixin withGrayBottomBorder {
      border-bottom: 0.5px solid #a098ae;
      padding-bottom: 16px;
    }

    .heading {
      @include withGrayBottomBorder;
      .weather-container {
        .t1 {
          font-weight: normal;
          font-size: 19px;
          line-height: 28px;
          color: #363b64;
        }
      }
    }

    .description {
      @include withGrayBottomBorder;
    }
  }
}
</style>
