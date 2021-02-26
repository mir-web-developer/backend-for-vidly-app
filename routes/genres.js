const express = require("express");
const {Genre, validate} = require("../models/genre")
const router = express.Router();


// const movies = [
//   { id: 1, genre: "action" },
//   { id: 2, genre: "horror" },
//   { id: 3, genre: "fantazy" },
// ];

//   router.get("/api/movies", (req, res) => {
//       res.send(movies);
//     });

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  // const genre = genres.find((m) => m.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("such id not found");

  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // const newMovie = {
  //   id: movies.length + 1,
  //   genre: req.body.genre,
  // };
  // movies.push(newMovie);
  let genre = new Genre({
    genre: req.body.genre,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { genre: req.body.genre },
    { new: true }
  );

  if (!genre) return res.status(404).send("such id not found");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("such id not found");
  res.send(genre);

  // const index = movies.indexOf(movie);
  // movies.splice(index, 1);
});



module.exports = router;
