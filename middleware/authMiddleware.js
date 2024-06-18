// middleware/authMiddleware.js
const { Users } = require('../models'); // Adjust the path as needed

async function authMiddleware(req, res, next) {
  if (req.session.user_id) {
    try {
      // Fetch user data based on user_id if needed
      const userData = await Users.findByPk(req.session.user_id);
      if (userData) {
        req.session.user = userData.get({ plain: true });
        res.locals.loggedIn = true;
        res.locals.user = req.session.user;
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  }
  next(); 
}

module.exports = authMiddleware;
