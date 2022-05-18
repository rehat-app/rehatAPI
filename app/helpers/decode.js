const jwt_decode = require('jwt-decode');

exports.decodeJWT = (token) => {
  const decode = jwt_decode(token);

  return decode;
};
