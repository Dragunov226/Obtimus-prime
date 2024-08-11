module.exports = {
  config: {
    name: "nothing",
    version: "1.0",
    author: "Cruizex",
    countDown: 0,
    role: 0,
    category: "Utility",
    shortDescription: "empty",
    longDescription: "empty",
    guide: {
      en: "{pn} - null - Does Nothing",
    },
  },

  onStart: async function ({ api, args, message }) {
    // This command does nothing
  }
};
