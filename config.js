import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  // PUERTO______________________________________________________________
  PORT: process.env.PORT,
  // backend LEGACY STORE ADMIN______________________________________________________________
  back_legacy_admin_dev : process.env.BACK_LEGACY_ADMIN_DEV,
  back_legacy_admin_prod : process.env.BACK_LEGACY_ADMIN_PROD,
  // FRONT PANEL ______________________________________________________________
  front_url_panel_dev: process.env.FRONT_URL_PANEL_DEV,
  front_url_panel_prod: process.env.FRONT_URL_PANEL_PROD,
  // FRONT STORE ______________________________________________________________
  front_url_store_dev: process.env.FRONT_URL_STORE_DEV,
  front_url_store_prod: process.env.FRONT_URL_STORE_PROD,
  // ORIGIN THIS BACK FOR FETCH ______________________________________________________________
  back_origin_url_dev: process.env.BACK_ORIGIN_URL_DEV,
  back_origin_url_prod: process.env.BACK_ORIGIN_URL_PROD,
  // DATABASES ADMIN ______________________________________________________________
  dev_url_database_admin: process.env.DEV_URL_DATABASE_ADMIN,
  prod_url_database_admin: process.env.PROD_URL_DATABASE_ADMIN,
  // DATABASES CLIENTS ______________________________________________________________
  dev_url: process.env.DEV_URL,
  prod_url1: process.env.PROD_URL1,
  prod_url2: process.env.PROD_URL2,
  // MERCADO PAGO ______________________________________________________________
  access_token_mp: process.env.ACCESS_TOKEN_MP,
  success_url_mp: process.env.SUCCESS_URL_MP,
  failure_url_mp: process.env.FAILURE_URL_MP,
  notification_url_mp: process.env.NOTIFICATION_URL_MP,

  // JWT ______________________________________________________________
  private_key_jwt: process.env.PRIVATE_KEY_JWT,
  // ENV ______________________________________________________________
  env: process.argv[2],

  emailAdmin: process.env.EMAIL_ADMIN,
  google : {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.GMAILPASSWORD
  },

  // FIREBASE CONFIG MI CUENTA ______________________________________________________________
  firebaseAccountKey: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
  },
  storage_bucket: process.env.STORAGE_BUCKET
}

export default config;