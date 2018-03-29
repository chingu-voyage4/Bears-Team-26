const loginAction = () => {
  return {
    type: "LOGIN"
  };
};

const logoutAction = () => {
  return {
    type: "LOGOUT"
  };
};

module.exports = {
  loginAction,
  logoutAction
};
