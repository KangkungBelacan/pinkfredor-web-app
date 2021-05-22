import drive_cred from "./drive_credentials.json";
require('dotenv').config();
const API_SECRET = process.env.API_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const DRIVE_CREDENTIAL = drive_cred;

export const env = {API_SECRET, CLIENT_ID, DRIVE_CREDENTIAL};