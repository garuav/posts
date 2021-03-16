import React, { useEffect, useReducer} from 'react';
import { Col, Container, Row, ListGroup,  InputGroup, FormControl } from 'react-bootstrap';
import { GetUsers, GetPosts, SavePost, SaveReplyINPost } from '../../utils/firebase/service'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import User from '../user/user'
import Post from '../post/post'
import  {PostReducer as reducer }   from '../../utils/state/reducers'
import {ActionTypes} from '../../utils/state/actionTypes'
import './home.scss'


const Home = () => {
    const initialData = {
        users: [],
        posts:[],
        isShowNewPost:false,
        isLoading: false,
        isError: false,
        replyTxtValue: '',
        newPostTxt: ''
    }
    // reducer 
    const [state, dispatch] = useReducer(reducer, initialData)

    useEffect(() => {
        console.log('state = ',state)
        dispatch({
            type: ActionTypes.FETCH,
            state
        })
      
        GetUsers().then(response => {
            console.log('response = > ', response )
            if(response && response.length > 0) {
                // setusers(response)
               
                dispatch({
                    type:ActionTypes.SUCCESS,
                    users: response,
                })
            console.log('state = > ', state )
              
            }
        }).catch(error => {
            console.log('error = > ', error )

        })
        dispatch({
            type:ActionTypes.FETCH,
            state
        })
        GetPosts().then(response => {
            console.log('response = > ', response )
            
            if(response && response.length > 0) {
                dispatch({
                    type:ActionTypes.SUCCESS,
                    posts: response
                })
                // setPosts(response)
              
            }
        }).catch(error => {
            console.log('error = > ', error )

        })
    }, [])
  
   const onSavePostHandler = () => {
    console.log('save post clicked ', state.newPostTxt)
    SavePost(state.newPostTxt).then(response => {
        console.log('newPost = ', response)
        dispatch({
            type: ActionTypes.NEW_POST,
            newPost: response
        })
        dispatch({
            type: ActionTypes.CLR_POST_TXT
           
        })
    }).catch(error => {
        console.log('error = ',error)
    })

    }

    const replyChangehandler = (e) => {
        console.log('reply typing  ', e.target.value)
        dispatch({
            type: ActionTypes.REPLY_TXT_CHANGE,
            replyTxtValue: e.target.value
        })
    }

    const replyTOPostHandler = (docID) => {
        console.log('reply to Post docID ', docID )
        dispatch({
            type: ActionTypes.NEW_REPLY,
            docID
        })
        console.log('reply to Post  ', state )
        SaveReplyINPost(docID, state.replyTxtValue).then(response => {
            console.log('response = ',response)
        }).catch(error => {
            console.log('error = ',error)
        })
    }

    const rowStyle = {
        height: "100%"
    }
    return (
        
        <Container fluid className="home-page">
            <Row style={rowStyle}>
                <Col md={12}>
                    Top Section 
                </Col>
                <Col md={8} className="main-panel">
                    <div className="new-post-container">
                    <InputGroup>
                        <FormControl as="textarea" aria-label="With textarea" value={state.newPostTxt} onChange={(e) => dispatch({ type: ActionTypes.POST_TXT_CHANGE, newPostTxt: e.target.value})} />
                        <InputGroup.Append onClick={onSavePostHandler}> 
                        <InputGroup.Text>ADD POST <FontAwesomeIcon icon={faPlus} /></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </div>
                    {
                        state.posts.length > 0 ? state.posts.map(post => <Post key={post.postID} {...post} replyChange= {replyChangehandler} replyTOPost={ replyTOPostHandler}></Post>) : <h1>No Posts</h1>
                    }
                
                </Col>
                <Col md={4} className="sidebar-panel">
                     <h1>Users </h1>
                        {
                            state.users.length > 0 ? <ListGroup variant="flush" > {state.users.map(user =>  <User  key={user.UID} {...user}/>)} </ListGroup> :
                            <h5>No Users</h5>
                        }
                   
                </Col>
            </Row>
        </Container>
    )
}

export default Home;