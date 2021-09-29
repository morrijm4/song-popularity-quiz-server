import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import scrapeTheHot100 from "./utils/scrapeTheHot100.js";
import getRandomSongs from "./utils/getRandomSongs.js";
import validateSubmission from "./utils/validateSubmission.js";

const PORT = 4000;

const main = async () => {
  const app = express();

  app.use(cors({ origin: `http://localhost:3000` }));
  app.use(bodyParser.json());

  // Scrape the hot 100 on server boot
  let songData = await scrapeTheHot100();

  let answer;

  // Called on page load
  app.get("/update_song_data", async (req, res) => {
    songData = await scrapeTheHot100();
  });

  // Request data for each question
  // param: number_of_songs - number of random songs to return
  app.get("/random_songs/:number_of_songs?", async (req, res, next) => {
    if (!req.params.number_of_songs) {
      next();
      return;
    }
    if (songData === undefined) {
      songData = await scrapeTheHot100();
    }
    const number_of_songs = parseInt(req.params.number_of_songs);
    answer = getRandomSongs(songData.list, number_of_songs);

    res.send(answer);
  });

  // Request data for each question
  // Default's to sending 3 random songs
  app.get("/random_songs", async (req, res) => {
    if (songData === undefined) {
      songData = await scrapeTheHot100();
    }
    answer = getRandomSongs(songData.list, 3);

    res.send(answer);
  });

  app.post("/validate", (req, res) => {
    const attempt = req.body;
    res.send(validateSubmission(attempt, answer));
  });

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

main();
