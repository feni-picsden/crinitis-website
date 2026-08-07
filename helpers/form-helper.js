import moment from 'moment';

const numberReg = /^[0-9\b]+$/;
const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export function isNumber(number) {
  if (numberReg.test(number)) {
    return true;
  }
  return false;
}

export function isEmail(email) {
  if (email.match(emailReg)) {
    return true;
  }
  return false;
}

export function objectToArray(obj) {
  let arry = [];
  for (var i = 0; i < Object.keys(obj).length; i++) {
    var key = Object.keys(obj)[i];
    var value = obj[key]
    arry[key] = value
  }
  return arry;
}

export function formatDate(date, dateFromFormat, dateToFormat) {
  if (dateFromFormat == null) {
    return moment(date).format(dateToFormat);
  } else {
    return moment(date, dateFromFormat).format(dateToFormat);
  }
}

export function formatTime(time, timeFromFormat, timeToFormat = "HH:mm:ss") {
  return moment(time, timeFromFormat).format(timeToFormat);
}

export function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

export function validateForm(state, requiredFields) {
  let new_state = objectToArray(state);
  if (requiredFields) {
    for (var i = 0; i < requiredFields.length; i++) {
      if (new_state[requiredFields[i]] == '' || new_state[requiredFields[i]] == null) {
        return requiredFields[i];
      }

      if (requiredFields[i] == 'card_expiry') {
        if (!new_state[requiredFields[i]].match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
          return false;
        }
      }
    }
  }
  return true;
}

export function getQuandooConfig(quandoo_id) {
  return '{"format":"text-button","bgcolor":"#000000","txcolor":"#ffffff","round":"no","position":"","font":"sm","agentID":120,"merchant":' + quandoo_id + ',"txt":"BOOK NOW"}';
}

export function generateRandom(min = 0, max = 100) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}