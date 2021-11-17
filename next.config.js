module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages/', 'components/', 'lib/', 'graphql/', 'client/']
  },
  env: {
    COOKIE_KEY_USER_ID: "ap21uid",
    CSRF_SECRET: "secret1234",
    /* Atlas URI: user:password@host/dbName */
    MONGODB_URI: "",
    MONGODB_DB_NAME: "test",
    /* headlessCMS */
    MY_SITE_ID: "1111",
    MY_API_KEY: "1111",
    API_URL: "http://localhost:3001",
  },  
}
