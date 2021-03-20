import { Card, FormControl } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './message.scss'
const Message = (props) => {
return (
    <Card className="message-box" style={{ width: '18rem' }}>
        <div className="header">
            <h6>{props.displayName || props.email.split('@')[0]}</h6>
            <a  className="close-icon">
            <FontAwesomeIcon icon={faTimes} />
                </a>

        </div>
  <Card.Body>
    <Card.Text>

            <span>

            </span>
    </Card.Text>
    <div className="new-message-container">
    <FormControl as="textarea" aria-label="With textarea" value={props.chatTxt} onChange={props.changeChatTxt} />
    <a  className="send-icon" onClick={props.sendChatMessage}>
    <FontAwesomeIcon icon={faPaperPlane} />

                </a>
    </div>
  </Card.Body>
</Card>
)
}

export default Message