import Axios from "axios"

/*----------------------- CONSTANT ------------------------------ */

const CHANGE_EMAIL = 'CHANGE_EMAIL',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    LOG_IN = 'LOG_IN'


/*----------------------- STATE ------------------------------ */

const initialState = {    
    email: '',
    password: '',
    login: false
}


/*----------------------- REDUCER ------------------------------ */

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload
            }

        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case LOG_IN:
            return {
                ...state,
                login: true
            }

        default:
            return state
    }
}

export default authReducer



/*----------------------- ACTION CRERATORS ------------------------------ */

export const actionChangeEmail = payload => {
    return {
        type: CHANGE_EMAIL,
        payload
    }
}
export const actionChangePassword = payload => {
    return {
        type: CHANGE_PASSWORD, 
        payload
    }
}

export const actionLogIn = {type: LOG_IN}





/*----------------------- THUNKS ------------------------------ */

export function thunkChangeEmail(email) {
    return async dispatch => {
        dispatch(actionChangeEmail(email))
    }
}

export function thunkChangePassword(password) {
    return async dispatch => {
        dispatch(actionChangePassword(password))
    }
}

export function thunkLogin(data) {
    return async dispatch => {
        try {
            await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5ldxT5xDP_E1SvHfaEa_HnzvnIum7exk', data)
            dispatch(actionLogIn)
        } catch(error) {
        console.log(error)
        }
    }
}

