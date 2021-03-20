
import React from 'react';
import {Row, Col, Toast} from 'react-bootstrap';
import './toast.scss';

const ToastComponent = ({show = true, title, body, autoHide = true, delay = 5000, closeHandler = () => false}) => {
    return (
        <Row className="custom-toast">
      <Col>
        <Toast onClose={closeHandler} show={show} delay={delay} autohide= {autoHide}>
          <Toast.Header>
            <strong className="mr-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      </Col>
     
    </Row>
    )
}

export default ToastComponent