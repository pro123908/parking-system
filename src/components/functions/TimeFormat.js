export default millisec => {
  // var milliseconds = parseInt((millisec % 1000) / 100),
  let seconds = Math.floor((millisec / 1000) % 60);
  let minutes = Math.floor((millisec / (1000 * 60)) % 60);
  let hours = Math.floor((millisec / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let timeString = "";

  if (hours) {
    timeString = timeString.concat(`${hours} : `);
  }
  if (minutes) {
    timeString = timeString.concat(`${minutes} : `);
  }

  if (seconds) {
    timeString = timeString.concat(`${seconds}`);
  }

  return timeString;
};
