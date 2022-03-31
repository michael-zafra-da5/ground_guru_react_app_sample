const tokenReducer = (state = {access_token:''}, action) => {
    switch (action.type) {
      case "access_token":
        return {
          access_token: action.payload
        };
      default:
        return state;
    }
  };

export default tokenReducer;