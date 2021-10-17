module.exports = {
  transpileDependencies: ["vuetify", "vuex-persist"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/fonts.scss";`,
      },
    },
  },
};
