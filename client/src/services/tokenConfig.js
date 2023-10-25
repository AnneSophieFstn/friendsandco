/**
 * Token and User Id config file
 */

/**
 * Set token value in localStorage
 * @param {*} token
 */
exports.setToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Get token information from localStorage
 */
exports.getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Set UserId value in localStorage
 * @param {*} token
 */
exports.setUserId = (userId) => {
  localStorage.setItem("user_id", userId);
};

/**
 * Get UserId information from localStorage
 */
exports.getUserId = () => {
  const userIdString = localStorage.getItem("user_id");
  return parseInt(userIdString, 10);
};

/**
 * Remove all items in localStorage
 */
exports.removeTokenAndUserId = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
};
