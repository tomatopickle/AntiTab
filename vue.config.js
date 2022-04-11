module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      builderOptions: {
        extraResources: ['src', 'src/res/'],
      },
    },
  },
};