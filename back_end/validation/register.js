const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data, update) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (data.username && !Validator.isLength(data.username, {min: 4, max: 30}))
    errors.username = 'Username must be between 4 and 20 characters';

  if (data.email && !Validator.isEmail(data.email))
    errors.email = 'Email is invalid';

  if (data.password && !Validator.isLength(data.password, {min: 6, max: 30 }))
    errors.password = 'Password must be at least 6 characters';
  
  if (!update) { //skip validation
    if (Validator.isEmpty(data.username))
      errors.username = 'Username field is required';

    if (Validator.isEmpty(data.email))
      errors.email = 'Email field is required';

    if (Validator.isEmpty(data.password))
      errors.password = 'Password field is required';
      
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
      
    if (Validator.isEmpty(data.password2))
      errors.password2 = 'Confirm Password field is required';

    if (!Validator.equals(data.password, data.password2))
      errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};