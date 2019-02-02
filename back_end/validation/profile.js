const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.intro = !isEmpty(data.intro) ? data.intro : '';
  data.banner = !isEmpty(data.banner) ? data.banner : '';


  if (Validator.isEmpty(data.intro)) {
    errors.intro = 'Share something cool about you!';
  }

  if (!Validator.isLength(data.intro, { min: 4, max: 400 })) {
    errors.intro = 'Your intro must be between 10 and 400 characters';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
