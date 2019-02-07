const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.intro = !isEmpty(data.intro) ? data.intro : '';

  // if (Validator.isEmpty(data.intro)) {
  //   errors.intro = 'Share something cool about you!';
  // }

  if (!Validator.isLength(data.intro, { max: 300 })) {
    errors.intro = 'Your intro must be less than 300 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
