import express from "express";
import * as api from "./APIS";
import * as admin from 'firebase-admin';
import serviceaccount from "./pinkfredor-web-app-2c7d6-firebase-adminsdk-kf19w-b59326a602.json";

// Initialization
const app = express();
const port = 8080;
admin.initializeApp({
    credential: admin.credential.cert(serviceaccount as any)
});

// API Routes
app.get("/api/driveapi/authurl", api.driveapi.authurl);

app.get("/api/driveapi/oauth_callback", api.driveapi.oauth_callback);

// Start Express server
app.listen(port);