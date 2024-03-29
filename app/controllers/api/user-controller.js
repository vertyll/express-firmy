const User = require("../../db/models/user");

class UserController {
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("user not found");
      }

      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        throw new Error("password not valid");
      }

      // login
      res.status(200).json({ apiToken: user.apiToken });
    } catch (e) {
      res.status(401);
    }
  }
}

module.exports = new UserController();
