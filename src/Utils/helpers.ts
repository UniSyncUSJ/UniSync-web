export const StringToDateObject = (value:any):Date|null => {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
};