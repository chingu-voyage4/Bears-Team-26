const loginAction = user => {
  return {
    type: "LOGIN",
    user: user
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

const fetchBoardData = async function() {
  const boards = await fetch("/me/boards", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },
    credentials: "same-origin"
  });
  const json = boards.json();
  return json;
};

const setBoardData = boards => {
  return {
    type: "GET_BOARDS",
    boards: boards.result
  };
};

const getBoardDataAction = function() {
  return function(dispatch) {
    return fetchBoardData().then(
      data => dispatch(setBoardData(data)),
      err => console.log(err)
    );
  };
};

const retrievedPinsAction = () => {
  return {
    type: "RECENTLY_RETRIEVED_PINS"
  };
}

const retrieveNewPinsAction = () => {
  return {
    type: "RETRIEVE_NEW_PINS"
  };
}

module.exports = {
  logoutAction,
  getPinDataAction,
  loginAction,
  getBoardDataAction,
  retrievedPinsAction,
  retrieveNewPinsAction
};
