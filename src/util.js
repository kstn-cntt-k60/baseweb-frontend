export const omit = (object, key) => {
  const remains = { ...object };
  delete remains[key];
  return remains;
};

export const arrayToObjectWithId = array => {
  const obj = new Map();
  array.forEach(e => {
    obj[e.id] = e;
  });
  return obj;
};

export const setDifference = (a, b) => new Set([...a].filter(e => !b.has(e)));

const zeroPad = (num, size) => {
  const s = "000000000" + num;
  return s.substr(s.length - size);
};

export const formatDate = date => {
  const day = zeroPad(date.getDate(), 2);
  const month = zeroPad(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = date => {
  const day = zeroPad(date.getDate(), 2);
  const month = zeroPad(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  const hour = zeroPad(date.getHours(), 2);
  const minute = zeroPad(date.getMinutes(), 2);
  const second = zeroPad(date.getSeconds(), 2);

  return `${hour}:${minute}:${second} ${day}/${month}/${year}`;
};

export const getGender = genderId => {
  if (genderId === 1) {
    return "Male";
  } else if (genderId === 2) {
    return "Female";
  } else {
    return "Unknown";
  }
};
