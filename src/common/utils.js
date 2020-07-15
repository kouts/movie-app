export const clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

export const getYearFromIsoDate = function(isoDate) {
  return isoDate.split('-')[0];
};
