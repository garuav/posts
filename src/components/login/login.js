import React from 'react'
import {Row, Form, Container} from 'react-bootstrap'

const Login = () => {

    return (
        <>
        <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
        </Form>
        </Container>
        </>
    )
}

export default Login;