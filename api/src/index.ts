import express from "express";
import * as api from "./APIS";
import {verifyRequestAuthorization} from "./util/auth";
// Initialization
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes (Open)
app.post("/api/auth/login", api.auth.login);
app.post("/api/auth/devlogin", api.auth.devlogin);
app.get("/api/driveapi/oauth_callback", api.driveapi.oauth_callback);

app.use(verifyRequestAuthorization);

// API Routes (Protected)
app.post("/api/driveapi/files", api.driveapi.files.create);

app.post("/api/driveapi/files/scan", api.driveapi.files.scan);
app.post("/api/driveapi/authurl", api.driveapi.authurl);

// Start Express server
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
