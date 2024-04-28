
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import { dbConnection } from "./db.js";
import { Korisnik } from "./schemas.js";
import { verifyToken, verifyRole } from "./middleware.js";

const app = express();

// middleware

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());

// trying to establish db connection

const db = dbConnection();
const PORT = process.env.APP_PORT || 3000;
export const SECRET_KEY = process.env.SECRET_KEY || "tajniKljuc";
const saltRunde = 15;

app.get('/protected-route', verifyToken, verifyRole("admin"), (req, res) => {
    // Ova ruta se koristi kako bi provjerili jeli korisnik ulogiran
    res.status(201).send(true);
});

app.post("/register", async (req, res) => {
    try {
        const hashLozinka = await bcrypt.hash(req.body.password, saltRunde);
        const noviKorisnik = new Korisnik({ ...req.body, password: hashLozinka });
        await noviKorisnik.save();
        res.status(201).send('Korisnik uspješno registriran');
      } catch (error) {
        res.status(500).send(error.message);
      }
});

app.post("/login", async (req, res) => {
    try {
        const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
        if (korisnikBaza && await bcrypt.compare(req.body.password, korisnikBaza.password)) {
            const token = jwt.sign({ idKorisnika: korisnikBaza.username, uloga: korisnikBaza.role }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
          res.status(401).send('Neispravni podaci za prijavu');
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
});

// schemes should be defined in seperate file

// routes will be probs in folders

// middleware functions shoud be in seperate file aswell

app.listen(PORT, () => {
    console.log("listening on port", PORT);
});