import axios from "axios";

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

const fetchPinData = async function(id) {
  const data = await fetch(`/pin/${id}`, {
    method: "POST",
    body: JSON.stringify({
      id: id
    })
  });
  const json = await data.json();
  return json;
};

const setPinStateDataAction = data => {
  return {
    type: "SET_PIN_DATA_STATE",
    pinData: data.result || data.err
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
  logoutAction,
  getPinDataAction
};
