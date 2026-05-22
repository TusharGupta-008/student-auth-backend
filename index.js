import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("I'm on the Server");
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
