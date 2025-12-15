import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import { authMiddleware, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    let collection = await db.collection("sessions");
    let results = await collection
      .find({ userId: req.userId })
      .sort({ startTime: -1 })
      .toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching sessions");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("sessions");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching session");
  }
});

router.post("/", optionalAuth, async (req, res) => {
  try {
    let newDocument = {
      type: req.body.type,
      duration: req.body.duration,
      completed: req.body.completed || false,
      startTime: new Date(req.body.startTime),
      endTime: req.body.endTime ? new Date(req.body.endTime) : null,
      notes: req.body.notes || "",
      userId: req.userId || null,
    };
    let collection = await db.collection("sessions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding session");
  }
});

router.patch("/:id", optionalAuth, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    if (req.userId) {
      query.userId = req.userId;
    }

    const updates = {
      $set: {
        completed: req.body.completed,
        endTime: req.body.endTime ? new Date(req.body.endTime) : null,
        notes: req.body.notes,
      },
    };

    let collection = await db.collection("sessions");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating session");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const query = {
      _id: new ObjectId(req.params.id),
      userId: req.userId
    };
    const collection = db.collection("sessions");
    let result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send("Session not found or unauthorized");
    }

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting session");
  }
});

router.get("/stats/summary", authMiddleware, async (req, res) => {
  try {
    let collection = await db.collection("sessions");
    let sessions = await collection
      .find({ completed: true, userId: req.userId })
      .toArray();

    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
    const workSessions = sessions.filter(s => s.type === 'work').length;
    const breakSessions = sessions.filter(s => s.type !== 'work').length;

    res.send({
      totalSessions,
      totalMinutes,
      workSessions,
      breakSessions,
      totalHours: (totalMinutes / 60).toFixed(2)
    }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stats");
  }
});

export default router;
