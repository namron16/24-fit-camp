export const useFormatDate = (date) => {
  return date.toISOString().split("T")[0];
};
