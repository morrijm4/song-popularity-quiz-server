const validateSubmission = (attempt, answer) => {
  if (
    attempt.song0 === attempt.song1 ||
    attempt.song0 === attempt.song2 ||
    attempt.song1 === attempt.song2
  ) {
    return { msg: "You must put different values for each song", status: 2 };
  } else if (
    attempt.song0 === answer.list[0].song &&
    attempt.song1 === answer.list[1].song &&
    attempt.song2 === answer.list[2].song
  ) {
    return { msg: "Your answer is correct!", status: 0 };
  } else {
    return { msg: "Your answer is wrong :(", status: 1 };
  }
};

export default validateSubmission;
