import { SAVE_POST, GET_POSTS, DELETE_POST, NEW_REPLY, REPLY_TXT_CHANGE } from './postTypes'

export const savePosts = post => {
    return {
        type: SAVE_POST,
        payload: post
    }
}

export const getPosts = posts => {
    return {
        type: GET_POSTS,
        payload: posts
    }
}

export const deletePost = docID => {
    return {
        type: DELETE_POST,
        payload: docID
    }
}

export const newReply = (docID, replyData) => {
    return {
        type: NEW_REPLY,
        payload: {
            docID,
            replyData
        }
    }
}

export const replyTxtChange = (docID, replyTxtValue) => {
    return {
        type: REPLY_TXT_CHANGE,
        payload: {
            docID,
            replyTxtValue
        }
    }
}