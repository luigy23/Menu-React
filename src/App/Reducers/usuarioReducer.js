// Types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

// Estado inicial
const initialState = {
  isAuthenticated: false,
  user: null
}

// Reducer
export default function usuarioReducer(state = initialState, action) {

  switch(action.type) {
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload // usuario logueado
      }

    case LOGOUT: 
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }

    default:
      return state

  }

}

// Actions
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user 
})

export const logout = () => ({
  type: LOGOUT
})