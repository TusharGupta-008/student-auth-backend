// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./db/db.js";
// import appRouter from "./routes/user.routes.js";

// const app = express();
// dotenv.config();

// app.use(express.json());

// const port = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//   res.send("I'm on the Server");
// });
// app.use("/api", appRouter);

// connectDb();
// app.listen(port, () => {
//   console.log(`Server is running ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import appRouter from "./routes/user.routes.js";
import connectDb from "./db/db.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", appRouter);

const port = process.env.PORT || 5000;
connectDb()
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
