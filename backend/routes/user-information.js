import express from "express";

export const userInformationRoutes = (verifyToken, verifyRole, Korisnik) => {
  const router = express.Router();

  router.get("/", verifyToken, async (req, res) => {
    const userInformation = await Korisnik.findById(req.korisnik.idKorisnika);
    res.status(201).send(userInformation);
  });

  router.put(
    "/:id",
    verifyToken,
    verifyRole("admin"),
    async (req, res) => {
      const userId = req.params.id;
      const changedValues = req.body;

      try {
        const userToBeUpdated = await Korisnik.findById(userId);

        if (!userToBeUpdated) {
          return res.status(404).send("User not found");
        }

        Object.assign(userToBeUpdated, changedValues);

        await userToBeUpdated.save();

        res.status(201).send("User sucessfully updated");
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  );

  return router;
};
