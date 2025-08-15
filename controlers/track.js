const express = require("express");
const Track = require("../models/Track.js");
const router = express.Router();

router.use((req, res, next) => {
  //middleware
  //future authentication;
  if (true) {
    next();
  } else {
    //rediect to login or 401???
  }
});

router.route('/')
  .get(async (req, res) => {
    try {
      const allTracks = await Track.find();
      return res.status(200).json(allTracks);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const { title, artist } = req.body;
      if (!title || !artist) {
        return res.sendStatus(423);
      }
      const newTrack = await Track.create({ title, artist });
      return res.status(201).json(newTrack);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.sendStatus(423);
      }
      const track = await Track.findById(id);
      if (!track) {
        return res.sendStatus(404);
      }
      return res.status(200).json(track);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, artist } = req.body;
      if (!id || !title || !artist) {
        return res.sendStatus(423);
      }
      const updatedTrack = await Track.findByIdAndUpdate(id, { title, artist });

      return res.status(200).json(updatedTrack);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.sendStatus(423);
      }
      const track = await Track.findById(id);
      if (!track) {
        return res.sendStatus(404);
      }
      await Track.findByIdAndDelete(id);
      return res.status(200).json(track);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  });

module.exports = router;
