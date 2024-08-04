export const getShortName = (name: string) =>
  `${name.split(' ')[0].substring(0, 1)}. ${name.split(' ')[1]}`;
