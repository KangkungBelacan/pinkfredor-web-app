require('dotenv').config();

const API_SECRET = process.env.API_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;

export const env = {API_SECRET, CLIENT_ID};