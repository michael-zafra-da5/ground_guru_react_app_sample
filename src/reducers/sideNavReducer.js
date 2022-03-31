const tokenReducer = (state = {sidenav_status:''}, action) => {
    switch (action.type) {
      case "sidenav_status":
        return {
          sidenav_status: action.payload
        };
      default:
        return state;
    }
  };

export default tokenReducer;