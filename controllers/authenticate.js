const authUserLogin = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).send({
      error: "Unauthorized: Please login to make changes!",
      login: "You can log in at:  localhost:8080/login",
    });
  }
  next();
};

module.exports = { authUserLogin };
