import express from "express";

export const donationRoutes = (verifyToken, verifyRole, Donacija) => {
  const router = express.Router();

  router.get("/:type", verifyToken, async (req, res) => {
    const requestedDonationType = req.params.type;

    try {
      const allDonationsOfType = await Donacija.find({
        donationStatus: requestedDonationType,
      });

      if (allDonationsOfType.length > 0) {
        res.status(201).send({ allDonationsOfType });
      } else {
        res.status(200).send({});
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.post("/", verifyToken, async (req, res) => {
    try {
      const newDonation = new Donacija({ ...req.body });
      await newDonation.save();
      res.status(201).send("Donation sucessfully registered");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    const donationId = req.params.id;

    try {
      const donationToDelete = await Donacija.findOneAndDelete({
        _id: donationId,
      });

      if (!donationToDelete) {
        return res.status(404).json("Donation not found");
      } else {
        res.status(201).json("Donacija je uspjesno izbrisana");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.patch("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    const donationId = req.params.id;
    const requestedDonationStatus = req.body.donationStatus;

    try {
      const donation = await Donacija.findOneAndUpdate(
        { _id: donationId },
        { donationStatus: requestedDonationStatus },
        { new: true }
      );

      if (donation) {
        res.status(201).send("Donation sucessfully updated");
      } else {
        res.status(200).send({});
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
};
