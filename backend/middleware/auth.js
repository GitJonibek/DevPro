const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  const { xauthtk } = req.query;

  // Check if not exist
  if(!token && !xauthtk) {
    return res.status(401).json({msg: 'No token, authorization denied!'});
  }

  // Varify token
  try {
    let decoded = '';
    if (token) { decoded = jwt.verify(token, config.get('jwtSecret')); }
    else if (xauthtk) { decoded = jwt.verify(xauthtk, config.get('jwtSecret')); }
    req.user = decoded.user;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json({msg: 'Token is not valid!'});
  }

}
