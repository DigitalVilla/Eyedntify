import { isEmpty } from './utils';

export const validate = (payload) => {
  const errors = {}
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      if (isEmpty(payload[key])) {
        errors[key] = `You need a valid ${key.replace(/\d+/g, '')}`
      }
    }

    if (key === "password2" && !isEmpty(payload[key]) &&
      payload[key] !== payload.password) {
      errors[key] = `Nope, they do not match!`
    }

    if (key === "password2" && !isEmpty(payload[key]) &&
      (payload.password.length < 6 || payload.password.length > 20)) {
      errors["password"] = `Password must be between 6 and 20 characters`
    }

    if (key === "password2" && !isEmpty(payload[key]) &&
      (payload.username.length < 4 || payload.username.length > 14)) {
      errors["username"] = `Username must be between 4 and 20 characters`
    }

    if (key === "email" && !isEmpty(payload.email) && !validateEmail(payload.email)) {
      errors[key] = `Please enter a valid email`
    }
  }
  return errors;
}

function validateEmail(email) {
  if (email.length > 50) return false;
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
