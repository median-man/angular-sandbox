import { AuthActions, SIGNUP, SIGNIN, SET_TOKEN, LOGOUT } from './auth.actions';

export interface State {
  token: string;
  isAuthenticated: boolean;
}

const initialState = {
  token: '',
  isAuthenticated: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNUP:
    case SIGNIN:
      return signin(state);

    case SET_TOKEN:
      return setToken(state, action);

    case LOGOUT:
      return logout(state);

    default:
      return state;
  }
}

function signin(state) {
  return {
    ...state,
    isAuthenticated: true,
  };
}

function setToken(state, action) {
  const { payload: token } = action;
  return {
    ...state,
    token,
  };
}

function logout(state) {
  return {
    ...state,
    ...initialState,
  };
}
