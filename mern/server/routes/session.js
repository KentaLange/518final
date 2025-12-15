import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("sessions");
    let results = await collection.find({}).sort({ startTime: -1 }).toArray();
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

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      type: req.body.type,
      duration: req.body.duration,
      completed: req.body.completed || false,
      startTime: new Date(req.body.startTime),
      endTime: req.body.endTime ? new Date(req.body.endTime) : null,
      notes: req.body.notes || "",
    };
    let collection = await db.collection("sessions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding session");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
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

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("sessions");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting session");
  }
});

router.get("/stats/summary", async (req, res) => {
  try {
    let collection = await db.collection("sessions");
    let sessions = await collection.find({ completed: true }).toArray();

    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
    const workSessions = sessions.filter(s => s.type === 'work').length;
    const breakSessions = sessions.filter(s => s.type === 'break').length;

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
