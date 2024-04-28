import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./server.js";

export const verifyToken = (req, res, next) => {
    const authZaglavlje = req.headers['authorization'];
    if (!authZaglavlje) return res.status(403).send('Ne postoji autorizacijsko zaglavlje');
   
    const token = authZaglavlje.split(' ')[1];
    if (!token) return res.status(403).send('Bearer token nije pronađen');

    try {
      const dekodiraniToken = jwt.verify(token, SECRET_KEY); 
      req.korisnik = dekodiraniToken;
    } catch (err) {
      return res.status(401).send('Neispravni Token');
    }
    return next();
};

export const verifyRole = (verifiedRole) => (req, res, next) => {
    if (req.korisnik && req.korisnik.uloga === verifiedRole) {
        next();
      } else {
        res.status(403).send(`Zabranjen pristup - vaša uloga je ${req.korisnik.uloga} `);
      }
}