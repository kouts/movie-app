export const clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const getYearFromIsoDate = function(isoDate) {
  return isoDate ? isoDate.split('-')[0] : null;
};
