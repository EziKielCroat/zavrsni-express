
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import { dbConnection } from "./db.js";

const app = express();

// middleware

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// trying to establish db connection

const db = dbConnection();
const PORT = process.env.APP_PORT || 3000;

// schemes should be defined in seperate file

// routes will be probs in folders

// middleware functions shoud be in seperate file aswell

app.listen(PORT, () => {
    console.log("listening on port", PORT);
});