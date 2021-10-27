# Pinkfredor API
API for pinkfredor

## To start
1. `npm install`
2. Download firebase service account json file and put it in src directory (`pinkfredor-web-app-2c7d6-firebase-adminsdk-kf19w-b59326a602.json`)
3. Add drive oauth client credentials into a json file in src directory (`drive_credentials.json`)
4. Add `redirect_uri` field into `drive_credentials.json` and set it to the correct oauth callback endpoint
5. (Dev) Add `.env` in src folder with API_SECRET, CLIENT_ID set
6. `npm start`