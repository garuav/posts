import React, { useEffect,  useRef, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap'
import {  GetPosts, SavePost, SaveReplyINPost, DeletePosts } from '../../utils/firebase/service'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch} from 'react-redux'
import Post from './post/post'
import { getPosts, savePosts, deletePost, newReply, replyTxtChange } from '../../utils/redux/posts/postsActions'
import { showSpinner, hideSpinner } from '../../utils/redux/spinner/spinnerAction'
import './posts.scss'

const Posts = () => {
    const postsState = useSelector(state => state.posts)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const spinnerDispatch = useDispatch();

    const [newPostTxt, setNewPostTxt] = useState('');

    let isMounted = useRef(false);
    useEffect(() => {
        console.log('users = ',users)
        spinnerDispatch(showSpinner())
        GetPosts().then(response => {
        spinnerDispatch(hideSpinner())
            if(response && response.length > 0 &&  !isMounted.current ) {
                dispatch(getPosts(response))
            }
        }).catch(error => {
        spinnerDispatch(hideSpinner())
            console.log('error = > ', error )
            isMounted.current= true;
        })
        
       return () => {
        isMounted.current= true;
       }
    }, [])
  
   const onSavePostHandler = () => {
    SavePost(newPostTxt).then(response => {
        dispatch(savePosts(response))
        setNewPostTxt('');
        // const payload = {
        //     token: 
        // }
        // SendNotification()
    }).catch(error => {
        console.log('error = ',error)
    })

    }

    const replyChangehandler = (e,docID) => {
        dispatch(replyTxtChange(docID, e.target.value))
    }

    const replyTOPostHandler = (docID) => {
        const postIndex = postsState.posts.findIndex(post =>  post.docID === docID);
        SaveReplyINPost(docID, postsState.posts[postIndex].replyTxtValue).then(response => {
            const replyData = {...response} 
            dispatch(newReply(docID,replyData))
        }).catch(error => {
            console.log('error = ',error)
        })
    
    }

    const deletePostHandler = (docID) => {
        DeletePosts(docID).then(res => {
            if(res && res.id) {
                dispatch(deletePost(docID))
            }
        }).catch(err => {
            console.log('err = ',err)
        })
    }
        return (
            <>
            <div className="new-post-container">
            <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" placeholder="Enter Post Content" value={newPostTxt} onChange={(e) =>  setNewPostTxt( e.target.value)} />
                <InputGroup.Append className={newPostTxt === '' ? 'disable-btn-style': ''} onClick={onSavePostHandler} > 
                <InputGroup.Text >ADD POST <FontAwesomeIcon icon={faPlus} /></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            </div>
            {
                postsState.posts.length > 0 ? postsState.posts.map(post => <Post key={post.postID} {...post} replyChange= {replyChangehandler} replyTOPost={ replyTOPostHandler} deletePost={deletePostHandler}></Post>) : <h1>No Posts</h1>
            }
            </>
        )

}

export default Posts;