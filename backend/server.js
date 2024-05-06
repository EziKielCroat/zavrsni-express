import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import { dbConnection } from "./db.js";
import {
  Korisnik,
  Upit,
  Donacija,
  Notifikacija,
  Zivotinja,
} from "./schemas.js";

import { verifyRole, verifyToken } from "./middleware.js";

import { userInformationRoutes } from "./routes/user-information.js";
import { requestsRoutes } from "./routes/requests.js";
import { donationRoutes } from "./routes/donations.js";
import { notificationRoutes } from "./routes/notifications.js";
import { animalsRoutes } from "./routes/animals.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Request logging in development mode
}

const db = dbConnection(); // Connecting to MongoDB
const PORT = process.env.APP_PORT || 3000;
const saltRunde = 15;

export const SECRET_KEY = process.env.SECRET_KEY || "tajniKljuc"; // Secret key for jwt keys

app.post("/register", async (req, res) => {
  try {
    const hashLozinka = await bcrypt.hash(req.body.password, saltRunde);
    const noviKorisnik = new Korisnik({ ...req.body, password: hashLozinka });
    await noviKorisnik.save();
    res.status(201).send("Korisnik uspješno registriran");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
    if (
      korisnikBaza &&
      (await bcrypt.compare(req.body.password, korisnikBaza.password))
    ) {
      const token = jwt.sign(
        { idKorisnika: korisnikBaza._id, uloga: korisnikBaza.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).send("Neispravni podaci za prijavu");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// All app routes

app.use("/user-information", userInformationRoutes(verifyToken, verifyRole, Korisnik));

app.use("/requests", requestsRoutes(verifyToken, verifyRole, Upit));

app.use("/donations", donationRoutes(verifyToken, verifyRole, Donacija));

app.use("/notifications", notificationRoutes(verifyToken, verifyRole, Notifikacija));

app.use("/animals", animalsRoutes(verifyToken, verifyRole, Zivotinja));

app.get("/protected-route", verifyToken, verifyRole("admin"), (req, res) => {
  // Using this route so I can tell if a user is logged in and an admin
  res.status(201).send(true);
});

app.listen(PORT, () => {
  console.log("Listening on port 3000", PORT);
});
