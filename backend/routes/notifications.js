import express from "express";

export const notificationRoutes = (verifyToken, verifyRole, Notifikacija) => {
  const router = express.Router();

  router.get("/", verifyToken, async (req, res) => {
    try {
      const allNotifications = await Notifikacija.find({});

      res.status(201).send({ allNotifications });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.post("/", verifyToken, async (req, res) => {
    try {
      const newNotification = new Notifikacija({ ...req.body });
      await newNotification.save();
      res.status(201).send("Notification sucessfully registered");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    const notificationId = req.params.id;
  
    try {
      const notificationToDelete = await Notifikacija.findOneAndDelete({
        _id: notificationId,
      });
  
      if (!notificationToDelete) {
        return res.status(404).json("Notification not found");
      } else {
        res.status(201).json("Notification sucessfully deleted.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
};
