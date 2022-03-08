const withImages = require("next-images");
module.exports = withImages({
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "en",
  },
});
// module.exports = {
//   i18n: {
//     locales: ["ar", "en"],
//     defaultLocale: "en",
//   },
// };
