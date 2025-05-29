export function calcDays(start, end) {
  if (!start || !end) return 0;
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

export function calcTotal(start, end, pricePerNight, guests) {
  const days = calcDays(start, end);
  return pricePerNight * days * guests;
}
