export function calcDays(start, end) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((end - start) / msPerDay);
}

export function calcTotal(start, end, guests, pricePerNight) {
  const days = calcDays(start, end);
  return days * pricePerNight;
}