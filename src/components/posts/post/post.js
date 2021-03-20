import React, { useRef, useEffect} from 'react'
import { Card, InputGroup, FormControl} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons'
import PropsTypes from 'prop-types';
import './post.scss'
const Post = (props) => {
const replyRef = useRef();
useEffect(() => {
  console.log('replyRef = ', replyRef)
  replyRef.current.scrollTop = replyRef.current.scrollHeight;
},[props.reply.length])
    return (
        <Card className="post-card">
          <Card.Title>
          <FontAwesomeIcon icon={faTrash} onClick={() => props.deletePost(props.docID)} />

          </Card.Title>
  <Card.Body>
    <Card.Text>
        {props.postTxt}
    </Card.Text>
    <p className="post-by-block"> Post By:  {props.postBy} </p>

    <div className="reply-block" ref={replyRef}>
        {
          props.reply.map(reply => <div className="reply-value" key={reply.replyID}><p > {reply.replyTxt}</p> <span>{reply.replyBy}</span></div>)
        }
      <div className="reply-input-btn">
      <InputGroup >
  
  <FormControl value={props.replyTxtValue || ''}  placeholder="Reply" onChange={(event) => props.replyChange(event, props.docID)} />
  <InputGroup.Append className={props.replyTxtValue === '' ? 'disable-btn-style' : ''} onClick={() => props.replyTOPost(props.docID)}>
  <InputGroup.Text >
  <FontAwesomeIcon icon={faReply} />

  </InputGroup.Text>
  </InputGroup.Append>
</InputGroup>
      </div>
    
    </div>
  </Card.Body>
</Card>
    )
}

Post.PropsTypes = {
  postTxt: PropsTypes.string,
  postBy: PropsTypes.string,
  reply: PropsTypes.array,
  replyTxtValue: PropsTypes.string,
  replyChange: PropsTypes.func,
  replyTOPost: PropsTypes.func,
  deletePost: PropsTypes.func
}

export default Post