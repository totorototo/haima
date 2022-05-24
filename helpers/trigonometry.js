export const convertToDegrees = (angle) => {
  return angle * (180 / Math.PI);
};

export const convertCartesianToPolar = ([x, y, z] = [0, 0, 0]) => {
  const radius = Math.sqrt(x * x + z * z);
  const elevation = convertToDegrees(Math.atan2(z, Math.abs(y)));
  const azimuth = convertToDegrees(Math.atan2(y, x));

  return { radius, elevation, azimuth };
};

/*export const convertCartesianToPolar = ([x, y, z]) => {
  const distance = Math.sqrt(x * x + y * y + z * z);
  if (distance === 0) {
    return { azimuth: 0, elevation: 0, distance: 0 };
  }

  const azimuth = convertToDegrees(Math.atan2(-1 * x, z));
  const elevation = convertToDegrees(Math.asin(y / distance));

  return {
    distance,
    azimuth: azimuth === -180 ? 180 : azimuth,
    elevation,
  };
};*/
