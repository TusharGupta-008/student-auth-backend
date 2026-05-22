import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.js";

const app = express();
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("I'm on the Server");
});

connectDb();
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
