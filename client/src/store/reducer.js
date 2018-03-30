const initialState = {
  isAuthenticated: false,
  pinData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false
      };
    case "SET_PIN_DATA_STATE":
      return {
        ...state,
        pinData: action.pinData
      };
    default:
      return state;
  }
};

export default reducer;
