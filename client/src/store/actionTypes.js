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

const getPinDataAction = async id => {
  /*
  const data = await fetch(data);
  return {
    type: "GET_PIN_DATA",
    payload: {...data}
  }
  */
};

module.exports = {
  loginAction,
  logoutAction,
  getPinDataAction
};
