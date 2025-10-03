// utils/errorHandler.js
const handleError = (err, res) => {
  console.error(err); // for debugging

  // Default response
  let statusCode = 500;
  let message = 'Something went wrong';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Collect all validation messages
    const errors = Object.values(err.errors).map(e => e.message);
    message = errors.join(', ');
  }

  // Duplicate key error (e.g., unique field like email/username)
  else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `${field} must be unique`;
  }

  // CastError (invalid ObjectId, etc.)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({ success: false, message });
};

export default handleError;
