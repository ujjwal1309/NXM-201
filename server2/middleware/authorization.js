const roles = {
  Admin: {
    permissions: ["get", "put", "patch", "delete"],
  },
  Super_Admin: {
    permissions: ["get", "put", "patch", "delete"],
  },
  User: {
    permissions: ["get"],
  },
};


function checkRole(...permittedRoles) {
    console.log(roles)
  return (req, res, next) => {
    console.log(req.user)
    if (permittedRoles.includes(req.user.role) &&
      roles[req.user.role].permissions.includes(req.method.toLowerCase())
    ) {
      next();
    } else {
      return res.status(500).json({ msg: "you are not authorized" });
    }
  };
}

module.exports = { checkRole };
