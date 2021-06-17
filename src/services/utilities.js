// function for making the single 0 of elapsedTime be converted into time, thus
// requiring seconds and then converting to minutes
// without export, it will not compile

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }