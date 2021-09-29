import fetch from "node-fetch";
import cheerio from "cheerio";

const scrapeTheHot100 = async () => {
  const result = await fetch("https://www.billboard.com/charts/hot-100");
  if (result.status === 200) {
    // Store HTML from GET request
    const html = await result.text();

    // Load HTML onto web scraping npm package
    const $ = cheerio.load(html);

    // Find DOM elements with top 100 songs
    const songs = $(".chart-element__information__song");

    let data = [];

    songs.each(function (idx, el) {
      data.push({
        song: $(el).text(),
        artist: $(el).next().text(),
      });
    });

    return { status: result.status, message: result.statusText, list: data };
  } else {
    return { status: result.status, message: result.statusText, list: [] };
  }
};

export default scrapeTheHot100;
