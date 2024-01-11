const config = {
  serverUrl:
    import.meta.env.MODE === "production"
      ? process.env.MONGODB_URI
      : "http://localhost:3000",
};

export default config;
