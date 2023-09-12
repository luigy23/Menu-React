// Types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const AGREGAR_NOTIFICACION = 'AGREGAR_NOTIFICACION'
const LIMPIAR_NOTIFICACIONES = 'LIMPIAR_NOTIFICACIONES'

// Estado inicial
const initialState = {
  isAuthenticated: false,
  user: null,
  notificaciones: []
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

    case AGREGAR_NOTIFICACION:
      return {
        ...state,
        notificaciones: [...state.notificaciones, action.payload]
      }
    case LIMPIAR_NOTIFICACIONES:
      return {
        ...state,
        notificaciones: []
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

export const agregarNotificacion = (notificacion) => ({
  type: AGREGAR_NOTIFICACION,
  payload: notificacion
})
export const limpiarNotificaciones = () => ({
  type: LIMPIAR_NOTIFICACIONES
})
