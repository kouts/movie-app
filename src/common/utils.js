export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const getYearFromIsoDate = (isoDate) => {
  return isoDate ? isoDate.split('-')[0] : null;
};
