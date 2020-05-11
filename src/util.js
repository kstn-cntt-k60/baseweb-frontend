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

export const setInsert = (s, e) => new Set([...s, e]);

export const setDelete = (s, e) => {
  const newSet = new Set(s);
  newSet.delete(e);
  return newSet;
};

export const setEquals = (a, b) =>
  a.size === b.size && [...a].every(value => b.has(value));

export const setSwitch = (s, e) => {
  if (s.has(e)) {
    return setDelete(s, e);
  } else {
    return setInsert(s, e);
  }
};

const zeroPad = (num, size) => {
  const s = "000000000" + num;
  return s.substr(s.length - size);
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  const day = zeroPad(date.getDate(), 2);
  const month = zeroPad(date.getMonth() + 1, 2);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = dateString => {
  const date = new Date(dateString);
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

const getUTCDate = d => {
  const date = new Date(d);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return { day, month, year };
};

export const dateEquals = (dateA, dateB) => {
  const a = getUTCDate(dateA);
  const b = getUTCDate(dateB);

  return a.day === b.day && a.month === b.month && a.year === b.year;
};
