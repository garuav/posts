import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import {ListGroup} from 'react-bootstrap'
import './user.scss'


const User = (props) =>{
    return (
       
        <ListGroup.Item className="user-list-item">{props.displayName || props.email.split('@')[0]}
        <FontAwesomeIcon icon={faComment} onClick={() => props.openChatBoxHandler(props)} />
        </ListGroup.Item>
        
    )
}

export default User;