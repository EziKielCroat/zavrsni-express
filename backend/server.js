
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import { dbConnection } from "./db.js";
import { Korisnik, Upit, Donacija, Notifikacija } from "./schemas.js";
import { verifyToken, verifyRole } from "./middleware.js";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());

const db = dbConnection();

const PORT = process.env.APP_PORT || 3000;
const saltRunde = 15;

export const SECRET_KEY = process.env.SECRET_KEY || "tajniKljuc";

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

app.post("/requests", async (req, res) => {
  try {
    const noviUpit = new Upit({ ...req.body });
    await noviUpit.save();
    res.status(201).send('Upit uspješno registriran');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/requests", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const sviUpiti = await Upit.find({});

    if (sviUpiti) {
      res.send({ sviUpiti });
    } else {
      res.status(404).send({});
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/donations", async (req, res) => {
  try {
    const novaDonacija = new Donacija({ ...req.body });
    await novaDonacija.save();
    res.status(201).send('Donacija uspješno registrirana');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/donations/:type", async (req, res) => {
  const requestedDonationType = req.params.type;

  try {
    const sveDonacijeTipa = await Donacija.find({ donationStatus: requestedDonationType });

    if (sveDonacijeTipa.length > 0) {
      res.send({ sveDonacijeTipa });
    } else {
      res.status(404).send({});
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/donations/:id", async (req, res) => {
  const donationId = req.params.id;
  const requestedDonationStatus = req.body.donationStatus;

  try {
    const donacija = await Donacija.findOneAndUpdate({ _id: donationId }, {donationStatus: requestedDonationStatus}, {new: true});

    if (donacija) {
      res.status(201).send(donacija);
    } else {
      res.status(404).send({});
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/notifications", async (req, res) => {
  try {
    const novaNotifikacija = new Notifikacija({ ...req.body });
    await novaNotifikacija.save();
    res.status(201).send('Notifikacija uspješno upisana');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/notifications", async (req, res) => {
  try {
    const sveNotifikacije = await Notifikacija.find({});

    res.send({ sveNotifikacije });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// routes will be probs in folders

app.listen(PORT, () => {
    console.log("listening on port", PORT);
});