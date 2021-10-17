import Swal from "sweetalert2";
import {
  USERS_DELETE_ONE,
  USERS_DELETE_ONE_ERROR,
  USERS_DELETE_ONE_SUCCESS,
  USERS_GET_ALL,
  USERS_GET_ALL_ERROR,
  USERS_GET_ALL_SUCCESS,
  USERS_GET_ONE,
  USERS_GET_ONE_ERROR,
  USERS_GET_ONE_SUCCESS,
  USERS_UPDATE_ONE,
  USERS_UPDATE_ONE_ERROR,
  USERS_UPDATE_ONE_SUCCESS,
} from "../../constants/user.types";
import {
  createOneUser,
  deleteOneUser,
  getAllUSers,
} from "../../services/users.service";

const initialState = {
  users: [],
  error: null,
  isLoading: false,
};

export default function appReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERS_GET_ALL:
    case USERS_GET_ONE:
    case USERS_DELETE_ONE:
    case USERS_UPDATE_ONE:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USERS_GET_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };

    case USERS_GET_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case USERS_UPDATE_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case USERS_DELETE_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case USERS_GET_ALL_ERROR:
    case USERS_GET_ONE_ERROR:
    case USERS_DELETE_ONE_ERROR:
    case USERS_UPDATE_ONE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}

export const doGetAllUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USERS_GET_ALL,
  });
  try {
    // Get user from store,
    const user = await getState().auth.user;

    // Get data from service, passing token from user
    const data = await getAllUSers({ token: user.token });

    dispatch({
      type: USERS_GET_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_GET_ALL_ERROR,
      payload: error,
    });
  }
};
export const doCreateOneUser = (userRegister) => async (dispatch, getState) => {
  dispatch({
    type: USERS_GET_ALL,
  });
  try {
    console.log(userRegister);
    // Get user from store,
    const user = await getState().auth.user;

    // Get data from service, passing token from user
    const data = await createOneUser({
      token: user.token,
      user: { ...userRegister },
    });
    console.log(data);
    dispatch({
      type: USERS_GET_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_GET_ALL_ERROR,
      payload: error,
    });
  }
};

export const doDeleteUserAction =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: USERS_DELETE_ONE,
    });
    try {
      // Get user from store,
      const user = getState().auth.user;

      // Get data from service, passing token from user
      const data = deleteOneUser({ id: id, token: user.token });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      dispatch({
        type: USERS_DELETE_ONE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USERS_DELETE_ONE_ERROR,
        payload: error,
      });
    }
  };
