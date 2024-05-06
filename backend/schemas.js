import { Schema, model } from "mongoose";

const korisnikShema = new Schema({
  username: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ["admin", "user"] },
  password: String,
});

const upitKorisnikaSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const donacijaSchema = new Schema({
  donationType: { type: String, required: true },
  donationAmount: { type: Number, required: true },
  donationDescription: { type: String, required: true, maxLength: 30 },
  donationStatus: {
    type: String,
    required: true,
    enum: ["offered", "inNeed", "donated"],
  },
});

const notifikacijaSchema = new Schema({
  notificationTitle: { type: String, required: true },
  notificationText: { type: String, required: true, minLength: 8 },
  notificationImportant: { type: Boolean, required: true },
});

const zivotinjaSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Pas", "Macka", "Ptica", "Gmizavac", "Ostalo"],
  },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  chipped: { type: Boolean, required: true },
  lastCheckup: { type: Date, required: true },
  adopted: { type: Boolean, required: true },
});

export const Korisnik = model("Korisnik", korisnikShema, "korisnici");

export const Upit = model("Upiti", upitKorisnikaSchema, "upiti");

export const Donacija = model("Donacije", donacijaSchema, "donacije");

export const Notifikacija = model("Notifikacije",notifikacijaSchema, "notifikacije");

export const Zivotinja = model("Zivotinje", zivotinjaSchema, "zivotinje");
