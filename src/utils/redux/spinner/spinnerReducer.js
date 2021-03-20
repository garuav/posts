import { SHOW_SPINNER,HIDE_SPINNER } from './spinnerAction'

 const spinnerReducer = (state = {isLoading: false}, action) => {

    switch(action.type) {
        case SHOW_SPINNER: 
        return {
            ...state,
            isLoading: true
        }
        case HIDE_SPINNER: 
        return {
            ...state,
            isLoading: false
        }

        default: return state;
    }
}

export default spinnerReducer