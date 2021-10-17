<template>
  <v-app>
    <v-app-bar absolute :elevation="0" class="header header-detail">
      <div class="d-flex flex-row">
        <v-app-bar-nav-icon @click="$router.back()">
          <v-icon color="white">mdi-chevron-left</v-icon>
        </v-app-bar-nav-icon>
        <div class="title d-flex flex-row justify-center align-center">
          Kec. Cimahi Tengah Detail
        </div>
      </div>
      <div class="d-flex flex-column align-center full-width mt-7">
        <v-switch
          v-model="switch1"
          inset
          color="white"
          light
          class="input-degree"
          :label="`Degree: ${!switch1 ? 'Celcius' : 'Fahrenheit'}`"
        ></v-switch>
        <v-icon color="white" :size="90">mdi-weather-partly-cloudy</v-icon>
        <h4 class="degree-text mt-8">72°</h4>
        <span class="lotlan-text"> 52.498611, 13.406889 </span>
        <span class="weather-text mt-10">Partly Cloud</span>
        <span class="date-text">Tuesday, 24 August 2021</span>
      </div>
    </v-app-bar>
    <v-main class="d-flex flex-column align-center main-content">
      <div class="main-container">
        <h3 class="title-heading">Details</h3>
        <div class="d-flex mt-4 flex-row full-width">
          <div class="box-content mr-2">
            <v-icon class="mr-3" :color="iconColor">mdi-thermometer</v-icon>
            <div class="d-flex flex-column text-container">
              <span class="t1">72°</span>
              <span class="t2">Fahrenheit</span>
            </div>
          </div>
          <div class="box-content">
            <v-icon class="mr-3" :color="iconColor">mdi-weather-windy</v-icon>
            <div class="d-flex flex-column text-container">
              <span class="t1">134 mp/h</span>
              <span class="t2">Pressure</span>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row full-width mt-4">
          <div class="box-content mr-2">
            <v-icon class="mr-3" :color="iconColor"
              >mdi-white-balance-sunny</v-icon
            >
            <div class="d-flex flex-column text-container">
              <span class="t1">0.2</span>
              <span class="t2">UV Index</span>
            </div>
          </div>
          <div class="box-content">
            <v-icon class="mr-3" :color="iconColor">mdi-weather-hail</v-icon>
            <div class="d-flex flex-column text-container">
              <span class="t1">48%</span>
              <span class="t2">Humidity</span>
            </div>
          </div>
        </div>
        <h3 class="title-heading mt-4">Tips</h3>
        <div class="full-width mt-4">
          <div class="d-flex flex-row box-content align-center">
            <img src="@/assets/tips.png" class="start-img" />
            <span class="t3 ml-3">Its ok to hangout with your friend!</span>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "Detail",
  data: () => ({
    switch1: false,
    iconColor: "rgba(124, 169, 255, 1)",
  }),
};
</script>
<style lang="scss">
@import "../styles/globals.scss";
$headerHeight: 441px;
.header-detail {
  background: linear-gradient(
    180deg,
    #3cd18a 0%,
    #3c6fd1 0.01%,
    #7ca9ff 100%
  ) !important;

  & * {
    color: white;
  }

  & > div {
    display: block;
  }

  .degree-text {
    font-weight: bold;
    font-size: 36px;
    line-height: 54px;
  }

  .lotlan-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.3px;
  }

  .weather-text {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
    letter-spacing: 0.30000001192092896px;
    text-align: center;
  }

  .date-text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: center;
  }

  .input-degree {
    label {
      color: white;
    }
  }

  height: $headerHeight !important;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
}

.main-content {
  margin-top: $headerHeight;
  padding-top: 24px !important;
  padding-bottom: 34px !important;
  background: #eee;
  backdrop-filter: blur(150px);
  .main-container {
    .title-heading {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.3px;
      color: #363b64;
    }
    .box-content {
      @include directionX;
      align-items: center;
      background: linear-gradient(
        258.12deg,
        #ffffff 1.16%,
        rgba(255, 255, 255, 0) 192.15%
      );
      flex: 1;
      border-radius: 20px;
      padding: 19.67px 20.82px;
      height: 76px;

      .text-container {
        .t1 {
          font-weight: 500;
          font-size: 16px;
          line-height: 16px;
          color: #363b64;
          letter-spacing: 0.3px;
        }
        .t2 {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          /* identical to box height, or 133% */
          color: #A098AE;
          letter-spacing: 0.3px;
        }
      }

      .t3 {
        font-weight: normal;
        font-size: 14px;
        line-height: 25px;
        color: #363B64;
      }

      .start-img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
