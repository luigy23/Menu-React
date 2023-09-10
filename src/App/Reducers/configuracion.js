//reducer de configuracion

const initialState = {
    nombreRestaurante: "Restaurante",
    logo: "logo.png",
    direccion: "Calle 123",
    iva: 0.19,
}

export default function configuracionReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CONFIGURACION":
            return {
                ...state,
                nombreRestaurante: action.payload.nombreRestaurante,
                logo: action.payload.logo,
                direccion: action.payload.direccion,
                iva: action.payload.iva,
            }
        default:
            return state
    }
}