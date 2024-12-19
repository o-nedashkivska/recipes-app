const getTimeAgo = (dateTimestamp: number) => {
  const diff = Date.now() - dateTimestamp;

  if (diff < 0) {
    throw new Error("Provided timestamp is in the future!");
  }

  const seconds = diff / 1000;

  if (seconds < 60) {
    const res = seconds.toFixed();
    return `${res} second${res !== "1" ? "s" : ""} ago`;
  }

  const minutes = seconds / 60;

  if (minutes < 60) {
    const res = minutes.toFixed();
    return `${res} minute${res !== "1" ? "s" : ""} ago`;
  }

  const hours = minutes / 60;

  if (hours < 60) {
    const res = hours.toFixed();
    return `${res} hour${res !== "1" ? "s" : ""} ago`;
  }

  const days = hours / 24;

  const res = days.toFixed();
  return `${res} day${res !== "1" ? "s" : ""} ago`;
};

export { getTimeAgo };
