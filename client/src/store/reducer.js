const initialState = {
  isAuthenticated: false,
  pinData: {},
  user: {},
  recentlyRetrievedPins: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
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
    case "GET_BOARDS":
      return {
        ...state,
        user: {
          ...state.user,
          boards: action.boards
        }
      };
    case "RECENTLY_RETRIEVED_PINS":
      return {
        ...state,
        recentlyRetrievedPins: true
      };
    case "RETRIEVE_NEW_PINS":
      return {
        ...state,
        recentlyRetrievedPins: false
      }
    default:
      return state;
  }
};

export default reducer;
