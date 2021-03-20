import { GET_USERS } from './userTypes'

const initialState = {
    users: []
}

export const userReducer = (state = initialState, action) => {
        switch (action.type) {
            case GET_USERS: 
            return {
                ...state,
                users: action.payload
            }
            default: return state;
        }
}