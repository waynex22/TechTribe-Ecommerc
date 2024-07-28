export const sortByValidity = <T>(items: T[], isValid: (item: T) => boolean): T[] => {
  return [...items].sort((a, b) => {
      const isAValid = isValid(a);
      const isBValid = isValid(b);
      return isAValid === isBValid ? 0 : isAValid ? -1 : 1;
  });
};
