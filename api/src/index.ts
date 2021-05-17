import express from "express";
import * as api from "./APIS";

// Initialization
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
app.post("/api/driveapi/authurl", api.driveapi.authurl);
app.get("/api/driveapi/oauth_callback", api.driveapi.oauth_callback);

app.post("/api/driveapi/music/get_index", api.driveapi.music.get_index);
app.post("/api/driveapi/music/scan", api.driveapi.music.scan);
app.post("/api/driveapi/music/update_index", api.driveapi.music.update_index);
app.post("/api/driveapi/music/remove_index", api.driveapi.music.remove_index);

app.post("/api/auth/login", api.auth.login);

// Start Express server
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
