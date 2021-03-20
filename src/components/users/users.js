import React, { useEffect, useReducer } from 'react';
import {ListGroup} from 'react-bootstrap'
import { GetLocalStorage, GetUsers, SendNotification } from '../../utils/firebase/service'

import './users.scss'
import User from './user/user';
import Message from '../messageBox/message';


const Users = (props) =>{
    const initialData = {
        users: [],
        openedChatBox: {
        messages : []
        },
        isChatBoxOpened: false,
        isLoading: false,
        isError: false,
        chatTxt: ''
       
    }
    // reducer 
    // const [state, dispatch] = useReducer(reducer, initialData)

    useEffect(() => {
        // dispatch({
        //     type: ActionTypes.FETCH,
        //     state
        // })
      
        GetUsers().then(response => {
            console.log('response = > ', response )
            if(response && response.length > 0) {
                // setusers(response)
                const userDetails = GetLocalStorage('userDetails');
                const userList = response.filter(user => user.UID !== userDetails.UID)
               
            //     dispatch({
            //         type:ActionTypes.SUCCESS,
            //         users: userList,
            //     })
            // console.log('state = > ', state )
              
            }
        }).catch(error => {
            console.log('error = > ', error )

        })
    }, [])

    const openChatBoxHandler = ({UID, displaName, email, token, messages = [], docID}) => {
        // if(!state.isChatBoxOpened) {
        //     dispatch({
        //         type: ActionTypes.OPEN_CHAT_BOX,
        //         payload: {
        //             UID,
        //             displaName,
        //             email,
        //             token,
        //             messages ,
        //             docID
        //         },
        //         isChatBoxOpened: true
        //     })
        //     console.log('state = ', state)
        // }
       
    }

    const sendMessage = () => {
        // console.log('state.openedChatBox = ', state.openedChatBox)
        // const {token = "" , UID= "", displayName= "", email="", docID} = state.openedChatBox
        // const payload = {
        //      token,
        //     UID,
        //     docID,
        //     // displayName,
        //     // email,
        //     title: `Message from ${displayName ? displayName : email.split('@')[0]}`,
        //     body: state.chatTxt,
        //     objectType: 'chat-message'
        // }
        // SendNotification(payload)
    }
    const changeChatTxtHandler = (e) => {
        // dispatch({
        //     type: ActionTypes.CHAT_TXT_HANDLER,
        //     chatTxt: e.target.value
        // })
        // console.log('state = ', state)

    }
    
    return (
        <h1>test</h1>
        // <>
        //          <h1>Users </h1>
        //                 {
        //                     state.users.length > 0 ? 
        //                     <ListGroup variant="flush" > {state.users.map(user =>  <User  key={user.UID} {...user}  openChatBoxHandler={openChatBoxHandler}/>)} </ListGroup> :
        //                     <h5>No Users</h5>
        //                 }

        //                 {state.isChatBoxOpened && <Message {...state.openedChatBox} sendChatMessage={sendMessage} changeChatTxt={ changeChatTxtHandler}/>}
        //                  </>
       
        // <ListGroup.Item className="user-list-item">{props.displayName || props.email.split('@')[0]}
        // <FontAwesomeIcon icon={faComment} onClick={() => props.openChatBoxHandler(props.UID)} />
        // </ListGroup.Item>
       
        
    )
                    }

export default Users ;