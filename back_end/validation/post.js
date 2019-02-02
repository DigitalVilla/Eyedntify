const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data, text) {
  let errors = {};

  const msg = !text ?"caption":"comment";
  
  data.caption = !isEmpty(data.caption) ? data.caption : '';

  if (!Validator.isLength(data.caption, { min: 4, max: 144 })) 
    errors.text = `The ${msg} must be between 4 and 144 characters`;
  
  if (Validator.isEmpty(data.caption)) 
    errors.text = `The ${msg} is required`;
  
  if (!text) {
    data.image = !isEmpty(data.image) ? data.image : '';
    if (Validator.isEmpty(data.image)) 
      errors.text = 'Image is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
