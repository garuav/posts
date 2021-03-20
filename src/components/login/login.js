import React, { useState} from 'react'
import {Button, Form, Container, Alert} from 'react-bootstrap'
import './login.scss'
import {LoginUser} from '../../utils/firebase/service'
import {Link, useHistory} from 'react-router-dom'

const Login = () => {
    const history = useHistory();
    const [loginForm, setLoginForm] = useState({email: '', password: ''})
    const [error,setError] = useState('');
    
        const  loginHandler = () => {
            
            console.log('loginForm ', {...loginForm})
            LoginUser(loginForm).then(response => {
                console.log('response = ', response);
                history.push('/home')
            }).catch(error => {
                console.log('error = ', error);
                switch (error) {
                    case  'auth/wrong-password' : 
                        setError(error.message);
                        // setToast(true);
                        break;
                    case 'auth/user-not-found':
                        setError(error.message);
                        // setToast(true);

                        break;
                    default: 
                        setError(error.message || 'Something went wrong Please try again later');
                        // setToast(true);

                        break;
                }
                if(error.code.includes('user-not-found')) {
                    setError(`User Doesn't exists. Please signup first`)
                }
            })
            // if (loginForm.email === 'gbgaurav461@gmail.com' && loginForm.password === 'pass') {
            //     localStorage.setItem('isAuth', JSON.stringify(true))
            // }
        }
 
    
    return (
        <>
        <Container className="login">
            <div className="form-wrapper">
            <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} name="email"/>
            
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} name="password"/>
            
        </Form.Group>
        {
            error ?  
            <Alert variant="danger">
            {error}</Alert>: null
        }
        <div className="button-container">
        <Button variant="primary" onClick={loginHandler}>Login</Button>
            <h6>OR</h6>
            <Link to="/register">
            <p >Register</p>
            </Link>
        </div>
        </Form>
            </div>
        
        </Container>
        </>
    )
}

export default Login;