const tokenReducer = (state = {access_token:''}, action) => {
    switch (action.type) {
      case "token":
        return {
          rotating: action.payload
        };
      default:
        return state;
    }
  };

export default tokenReducer;