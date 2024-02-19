const withTM = require('next-transpile-modules')([]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack5: true,
  env: {
    REACT_SERVER_URL: process.env.REACT_SERVER_URL,
    REACT_APP_ADDRESS: process.env.REACT_APP_ADDRESS
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false, crypto: false };

    return config;
  }
})