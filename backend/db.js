import mongoose from "mongoose";


export const dbConnection = () => {
    mongoose.connect(process.env.DB_LINK || "mongodb://127.0.0.1:27017/baza");

    const db = mongoose.connection;
    
    db.on("error", error => {
        console.error("Greška pri spajanju:", error);
    });
    
    db.once("open", function () {
        console.log("Spojeni smo na MongoDB bazu");
    });

    return db;
}