import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./server.js";

export const verifyToken = async (req, res, next) => {
  const authZaglavlje = req.headers["authorization"];
  if (!authZaglavlje)
    return res.status(403).send("Authorization header does not exist");

  const token = authZaglavlje.split(" ")[1];
  if (!token) return res.status(403).send("Bearer token was not found");

  try {
    const dekodiraniToken = jwt.verify(token, SECRET_KEY);
    req.korisnik = dekodiraniToken;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

export const verifyRole = (verifiedRole) => (req, res, next) => {
  if (req.korisnik && req.korisnik.uloga === verifiedRole) {
    next();
  } else {
    res
      .status(403)
      .send(`Forbidden access - your current role is ${req.korisnik.uloga} `);
  }
};
