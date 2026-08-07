const webpack = require("webpack");
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    PAGE_REVALIDATE_SECRETE: "clearCache4Crins",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  
  images: {
    domains: ["static.crinitis.com.au", "cr.crinitis.com.au"],
  },
  redirects: async () => {
    return [
      {
        source: "/metro-mania",
        destination: "/",
        permanent: false,
      },
      {
        source: "/reservations",
        destination: "/reservation",
        permanent: false,
      },
      {
        source: "/wonka",
        destination: "/",
        permanent: true,
      },
      {
        source: "/metro-mania",
        destination: "/whats-on",
        permanent: false,
      },
      {
        source: "/whats-on/crinitis-21st-anniversary",
        destination: "/whats-on",
        permanent: false,
      },
    ];
  },

};