import userReducer from "./users";
import authReducer from "./auth";

const reducer = {
  user: userReducer,
  auth: authReducer,
};

export default reducer;
