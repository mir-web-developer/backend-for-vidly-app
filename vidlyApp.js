const express = require("express");
const auth = require("./routes/auth")
const app = express();
const genres = require("./routes/genres");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals")
const users = require("./routes/users")
const config = require("config")

if(!config.get("jwtPrivateKey")){
  console.log("error: jwtPrivateKey is not defined")
  process.exit(1)
}


mongoose
  .connect("mongodb://localhost/vidlyapp")
  .then(() => {
    console.log("Connected to the vidlyapp database...");
  })
  .catch((err) => console.error("couldnot connect to the database"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals); 
app.use("/api/users",users);
app.use("/api/auth", auth)
app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Running on the port 3000..."));
