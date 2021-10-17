<template>
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
const GOOGLE_MAPS_API_KEY = "AIzaSyCJfNSlTfsEGFo5FrYLHXzQzRdFtLtY9Oo";
export default {
  name: "App",

  created() {
    const checkScript = document.getElementById("google-maps");
    if (!checkScript) {
      const script = document.createElement("script");
      const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.setAttribute("id", "google-maps");
      script.setAttribute("async", "");
      script.setAttribute("src", src);
      document.head.appendChild(script);
    }
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
$white-hehe: white;
* {
  font-family: Poppins;
}
</style>
