import { Schema, model } from "mongoose";

const korisnikShema = new Schema({
    username: String,
    email: { type: String, unique: true },
    role: {type: String, enum: ['admin', 'user']},
    password: String,
});

export const Korisnik = model("Korisnik", korisnikShema, "korisnici");