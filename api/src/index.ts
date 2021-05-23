import express from "express";
import * as api from "./APIS";
import {verifyRequestAuthorization} from "./util/auth";

// ======================================
// Initialization
// ======================================

const bodyParser = require("body-parser");
const app = express();
const port = 8080;

// ======================================
// ======================================

// Use bodyParser middleware to get form data in json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ======================================
// API Routes (Open)
// ======================================

app.post("/api/auth/login", api.auth.login);
app.post("/api/auth/devlogin", api.auth.devlogin);
app.get("/api/driveapi/oauth_callback", api.driveapi.oauth_callback);
app.get("/api/driveapi/files/download", api.driveapi.files.download);

// ======================================
// ======================================

// Make sure the response recieved from the endpoints after this line is properly authorized.
// See Express > Middleware
app.use(verifyRequestAuthorization);

// ======================================
// API Routes (Protected)
// ======================================

// Refer to index-files in firestore
app.post("/api/indexes/files", api.indexes.files.__create);
app.get("/api/indexes/files", api.indexes.files.__read);
app.put("/api/indexes/files/:fileid", api.indexes.files.__update);
app.delete("/api/indexes/files/:fileid", api.indexes.files.__delete);

// Refer to index-playlists in firestore
app.post("/api/indexes/playlists", api.indexes.playlists.__create);
app.get("/api/indexes/playlists", api.indexes.playlists.__read);
app.put("/api/indexes/playlists/:playlistid", api.indexes.playlists.__update);
app.delete("/api/indexes/playlists/:playlistid", api.indexes.playlists.__delete);

// Refer to index-genres in firestore
app.post("/api/indexes/genres", api.indexes.genres.__create);
app.get("/api/indexes/genres", api.indexes.genres.__read);
app.put("/api/indexes/genres/:genreid", api.indexes.genres.__update);
app.delete("/api/indexes/genres/:genreid", api.indexes.genres.__delete);

// Refer to index-albums in firestore
app.post("/api/indexes/albums", api.indexes.albums.__create);
app.get("/api/indexes/albums", api.indexes.albums.__read);
app.put("/api/indexes/albums/:albumid", api.indexes.albums.__update);
app.delete("/api/indexes/albums/:albumid", api.indexes.albums.__delete);

// Refer to index-artists in firestore
app.post("/api/indexes/artists", api.indexes.artists.__create);
app.get("/api/indexes/artists", api.indexes.artists.__read);
app.put("/api/indexes/artists/:artistid", api.indexes.artists.__update);
app.delete("/api/indexes/artists/:artistid", api.indexes.artists.__delete);

// Drive API use
app.post("/api/driveapi/files/scan", api.driveapi.files.scan);
app.post("/api/driveapi/authurl", api.driveapi.authurl);

// ======================================
// ======================================

// Start Express server
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
