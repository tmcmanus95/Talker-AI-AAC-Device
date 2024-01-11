const config = {
  serverUrl: import.meta.env.PROD
    ? import.meta.env.VITE_SERVER_URL
    : "http://localhost.com/3000",
};

export default config;
