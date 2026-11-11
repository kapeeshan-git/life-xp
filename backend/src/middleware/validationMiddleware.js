const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

const validateBody = (validatorFn) => (req, res, next) => {
  const errors = validatorFn(req.body || {});
  if (Array.isArray(errors) && errors.length > 0) {
    res.status(400);
    return next(new Error(errors.join(' ')));
  }
  return next();
};

const validateRegisterInput = (body) => {
  const errors = [];
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const confirmPassword = body.confirmPassword;

  if (!username) {
    errors.push('Username is required.');
  } else if (!USERNAME_REGEX.test(username)) {
    errors.push(
      'Username must be 3-30 characters and contain only letters, numbers, underscores, or hyphens.'
    );
  }

  if (!email) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address.');
  }

  if (!password) {
    errors.push('Password is required.');
  } else if (password.length < 8) {
    errors.push('Password must contain at least 8 characters.');
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push('Password and confirm password do not match.');
  }

  return errors;
};

const validateLoginInput = (body) => {
  const errors = [];
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address.');
  }

  if (!password) {
    errors.push('Password is required.');
  }

  return errors;
};

module.exports = {
  validateBody,
  validateRegisterInput,
  validateLoginInput,
};
