import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../../constants/user.types";
import { LoginService, SignUpService } from "../../services/auth.service";

const initialState = {
  user: null,
  isLogged: false,
  isLoading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        isLogged: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case LOGOUT:
      return {
        initialState,
      };
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}

// aux
function saveToSession(storage) {
  sessionStorage.storage = JSON.stringify(storage);
}

// actions
export const doLogOut = () => async (dispatch) => {
  sessionStorage.removeItem("storage");
  dispatch({
    type: LOGOUT,
  });
};
export const doLoginWithEmailAndPasswordAction =
  (user) => async (dispatch, getState) => {
    dispatch({
      type: LOGIN,
    });
    try {
      const { data } = await LoginService({ ...user });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      if (user.saveSession) {
        const auth = await getState().auth;
        saveToSession({ ...auth });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
      setTimeout(() => {
        dispatch({
          type: LOGIN_ERROR,
          payload: null,
        });
      }, 5000);
    }
  };

export const doSignUpWithEmailAndPasswordAction =
  (user) => async (dispatch) => {
    dispatch({
      type: SIGNUP,
    });
    try {
      const { data } = await SignUpService({ ...user });

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error,
      });
      setTimeout(() => {
        dispatch({
          type: LOGIN_ERROR,
          payload: null,
        });
      }, 5000);
    }
  };

export const restoreSessionAction = () => async (dispatch) => {
  let storage = sessionStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.token) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage,
    });
  }
};
