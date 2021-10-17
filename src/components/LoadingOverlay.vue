<template>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  name: "LoadingOverlay",
  props: {
    overlay: Boolean,
  },
};
</script>
