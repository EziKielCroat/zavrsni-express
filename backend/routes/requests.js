import express from "express";

export const requestsRoutes = (verifyToken, verifyRole, Upit) => {
  const router = express.Router();

  router.get("/", verifyToken, verifyRole("admin"), async (req, res) => {
    try {
      const allQueries = await Upit.find({});

      if (allQueries) {
        res.status(201).send({ allQueries });
      } else {
        res.status(200).send({});
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.post("/", verifyToken, async (req, res) => {
    try {
      const newQuery = new Upit({ ...req.body });
      await newQuery.save();
      res.status(201).send("Query sucessfully registered");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    const queryId = req.params.id;

    try {
      const queryToDelete = await Upit.findOneAndDelete({ _id: queryId });

      if (!queryToDelete) {
        return res.status(404).json("Query was not found");
      }

      res.status(201).send("Query sucessfully deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
};
