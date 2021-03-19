export const displayDate = (date) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + 1);

  const dateString = newDate.toISOString().split("-");
  const year = dateString[0];
  const month = dateString[1];
  const day = dateString[2].split("T")[0];

  return `${day}.${month}.${year}`;
};
