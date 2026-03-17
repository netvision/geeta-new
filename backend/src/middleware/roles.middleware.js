const { sendError } = require('../utils/response.utils');

// Usage: restrict('superadmin', 'school_admin')
const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `Role '${req.user.role}' is not permitted to perform this action.`
      );
    }
    next();
  };
};

module.exports = { restrict };
