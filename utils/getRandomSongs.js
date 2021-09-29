const getRandomSongs = (songsArray, numberOfSongs) => {
  const THIRD_OF_ARRAY_LENGTH = Math.floor(songsArray.length / 3);

  let songPos = 0;
  let randomNum = 0;
  let threeSongs = [];
  for (let i = 0; i < numberOfSongs - 1; ++i) {
    randomNum = Math.floor(Math.random() * THIRD_OF_ARRAY_LENGTH);
    songPos += randomNum;

    threeSongs.push(songsArray[songPos]);
    songPos++;
  }
  randomNum = Math.floor(Math.random() * (songsArray.length - songPos));
  songPos += randomNum;

  threeSongs.push(songsArray[songPos]);
  return { status: 200, message: "OK", list: threeSongs };
};

export default getRandomSongs;
