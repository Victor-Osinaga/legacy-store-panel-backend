import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  // backend legacy store
  API_LEGACY_BASE_URL : "http://localhost:2021/api-admin",
  front_url: process.env.FRONTEND_URL || "http://localhost:5173",
  PORT: process.env.PORT,
  dev_url: process.env.DEV_URL,
  prod_url: process.env.PROD_URL,
  access_token_mp: process.env.ACCESS_TOKEN_MP,
  success_url_mp: process.env.SUCCESS_URL_MP,
  failure_url_mp: process.env.FAILURE_URL_MP,
  notification_url_mp: process.env.NOTIFICATION_URL_MP,
  private_key_jwt: process.env.PRIVATE_KEY_JWT,
  env: process.argv[2],
  emailAdmin: process.env.EMAIL_ADMIN,
  google : {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.GMAILPASSWORD
  },
  firebaseAccountKey: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  },
  storage_bucket: process.env.STORAGE_BUCKET
}

export default config;