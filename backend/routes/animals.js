import express from "express";

export const animalsRoutes = (verifyToken, verifyRole, Zivotinja) => {
  const router = express.Router();

  router.get("/", verifyToken, async (req, res) => {
    try {
      const allAnimals = await Zivotinja.find({});
  
      res.status(201).send({ allAnimals });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.post("/", verifyToken, verifyRole("admin"), async (req, res) => {
    try {
      const newAnimal = new Zivotinja({ ...req.body });
      await newAnimal.save();
      res.status(201).send("Animal sucessfully registered");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.patch("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    const animalId = req.params.id;
    const changedValues = req.body;
  
    try {
      let changedAnimal = await Zivotinja.findById(animalId);
  
      if (!changedAnimal) {
        return res.status(404).json("Animal not found");
      }
  
      Object.keys(changedValues).forEach((key) => {
        changedAnimal[key] = changedValues[key];
      });
  
      await changedAnimal.save();
  
      res.status(201).json("Animal sucessfully updated");
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  router.patch("/adopt/:id", verifyToken, async (req, res) => {
    const animalId = req.params.id;
    const changedValues = req.body;
  
    try {
      let changedAnimal = await Zivotinja.findById(animalId);
  
      if (!changedAnimal) {
        return res.status(404).json("Animal not found");
      }
      
      changedAnimal.adopted = changedValues.adopted;
  
      await changedAnimal.save();
  
      res.status(201).json("Animal sucessfully updated");
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return router;
};
