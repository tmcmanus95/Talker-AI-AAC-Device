const config = {
  serverUrl: import.meta.env.PROD
    ? "https://localhost:4000"
    : "http://localhost:3000",
};

export default config;
