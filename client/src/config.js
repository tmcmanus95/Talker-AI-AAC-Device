const config = {
  serverUrl:
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : "http://localhost:3000",
};

export default config;
