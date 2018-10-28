import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./user";
import { request } from "https";

const app = express();
const dbUrl = "mongodb://localhost/practice_1";
const port = "8001";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  dbUrl,
  dbErr => {
    if (dbErr) throw new Error(dbErr);
    else console.log("db connected");
    app.get("/api/users", (req, res) => {
      User.find({}, (err, userArray) => {
        if (err) res.status(500).send();
        else res.status(200).send(userArray);
      });
    });
    app.put('/api/users', (req, res) => {
      const {id} = req.body;

      User.findByIdAndUpdate(id, {$set: {password: }})
    });
    app.post("/api/users", (req, res) => {
      const { userName, password } = req.body;

      new User({
        userName,
        password
      }).save(err => {
        if (err) res.status(500);
        else
          res
            .status(200)
            .send(`${userName}(${password}) was successfully created.`);
      });
    });
    app.listen(port, err => {
      if (err) throw new Error(err);
      else console.log(`listening on port ${port}`);
    });
  }
);

// app.delete([url], (req, res) => {});


