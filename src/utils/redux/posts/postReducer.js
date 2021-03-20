import { SAVE_POST, GET_POSTS, DELETE_POST, NEW_REPLY, REPLY_TXT_CHANGE } from './postTypes'

const initialState = {
    posts: []
}
const postReducer = (state = initialState, action) => {

    switch(action.type) {
        case SAVE_POST : 
        return {
            ...state,
            posts: [action.payload, ...state.posts]
        }
        case GET_POSTS : 
        return {
            ...state,
            posts: action.payload
        }
        case DELETE_POST :
            return {
                ...state,
                posts: state.posts.filter(post => post.docID !== action.payload)
            }
        case NEW_REPLY: 
            return {
                ...state,
                posts: state.posts.map(post => post.docID === action.payload.docID ? {...post, replyTxtValue: '', reply: [ ...post.reply, {...action.payload.replyData}]}: post),

            }
            case REPLY_TXT_CHANGE: 
            console.log('state = ',state , ' action = ',action)
            return {
                ...state,
                posts: state.posts.map(post => post.docID === action.payload.docID ? {...post, replyTxtValue: action.payload.replyTxtValue} : post),
            }
        default: return {...state}
    }

}

export default postReducer