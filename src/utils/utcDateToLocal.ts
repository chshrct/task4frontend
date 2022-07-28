export const utcDateToLocal = (date: string): string => {
  return new Date(date).toLocaleString();
};
