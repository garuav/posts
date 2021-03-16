import { ActionTypes } from './actionTypes';


const PostReducer =  (state,action) => {
    switch (action.type) {
        case ActionTypes.FETCH: 
            return {
                ...state,
                isLoading: true,
                isError: false,
               
            }
            case ActionTypes.SUCCESS: 
            console.log('fetch block', action)
            return {
                ...state,
                users: action.users ? action.users : state.users ,
                posts: action.posts ? action.posts : state.posts,
                isLoading: false,
                isError: false,
                
            }
            case ActionTypes.FAILURE: 
            return {
                ...state,
                isLoading: false,
                isError: true,
                
            }
            case ActionTypes.NEW_POST: 
            return {
                ...state,
                posts: [ action.newPost, ...state.posts]
            }
            case ActionTypes.POST_TXT_CHANGE:
                return {
                    ...state,
                    newPostTxt: action.newPostTxt
                }
            case ActionTypes.CLR_POST_TXT:
                return {
                    ...state,
                    newPostTxt : ''
                }
                case ActionTypes.REPLY_TXT_CHANGE: 
            return {
                ...state,
                replyTxtValue: action.replyTxtValue
            }
            case ActionTypes.NEW_REPLY: 
            return {
                ...state,
                posts: state.posts.map(post => post.docID === action.docID ? post.reply.push(state.replyTxtValue): post)
            }

            // case 'REPLY_POST_HANDLER': 
            // return {
            //     ...state,
            //     isLoading: true,
            //     isError: false,
            // }
            // case 'ADD_POST_HANDLER': 
            // return {
            //     ...state,
            //     isLoading: true,
            //     isError: false,
            // }
           
        default:
            return state;
           
    }
} 

export {PostReducer}