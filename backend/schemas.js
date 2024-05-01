import { Schema, model } from "mongoose";

const korisnikShema = new Schema({
    username: String,
    email: { type: String, unique: true },
    role: {type: String, enum: ['admin', 'user']},
    password: String,
});

const upitKorisnikaSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

export const Korisnik = model("Korisnik", korisnikShema, "korisnici");

export const Upit = model("Upiti", upitKorisnikaSchema, "upiti");