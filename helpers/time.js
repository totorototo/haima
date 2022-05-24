export const convertDurationToMs = (duration) => {
  const [hours, minutes, seconds] = duration.split(":");
  return (
    (Number(hours) * 60 * 60 + Number(minutes) * 60 + parseFloat(seconds)) *
    1000
  );
};
