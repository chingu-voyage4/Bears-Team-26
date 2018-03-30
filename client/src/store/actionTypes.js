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

const fetchPinData = function(id) {
  return fetch(`/pin/${id}`, {
    method: "POST",
    body: JSON.stringify({
      id: id
    })
  });
};

const createPinFetch = function(data) {
  return fetch("/pin/new", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

const setPinStateDataAction = data => {
  return {
    type: "SET_PIN_DATA_STATE",
    pinData: data
  };
};

const getPinDataAction = function(id) {
  return function(dispatch) {
    return fetchPinData(id).then(
      data => dispatch(setPinStateDataAction(data)),
      err => console.log(err)
    );
  };
};

module.exports = {
  loginAction,
  logoutAction,
  getPinDataAction,
  setPinStateDataAction
};
