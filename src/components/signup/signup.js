import React, { useState} from 'react'
import {Button, Form, Container, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './signup.scss'
import {RegisterUser} from '../../utils/firebase/service'
// import ToastComponent from '../toast/toast'
// import { toastDefaultConfig } from '../../utils/common/common.constant'

const Register = () => {
    const [registerForm, setRegisterForm] = useState({email: '', password: '', confirmPassword: ''})
    const [error,setError] = useState('');
    // const [showToast, setToast] = useState(false)
        const  registerHandler = () => {
            
            console.log('registerForm ', {...registerForm})
            RegisterUser(registerForm).then(response => {
                console.log('response = ',response)

            }).catch(error => {
                console.log('error = ',error)
                switch (error) {
                    case  'auth/email-already-in-use' : 
                        setError(error.message);
                        // setToast(true);
                        break;
                    case 'auth/weak-password':
                        setError(error.message);
                        // setToast(true);

                        break;
                    default: 
                        setError(error.message || 'Something went wrong Please try again later');
                        // setToast(true);

                        break;
                }
            })
        }   
 
    
    return (
        <>
        <Container className="signup">
        <div className="form-wrapper">
            <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={registerForm.email} onChange={e => setRegisterForm({...registerForm, email: e.target.value})} />
            
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={registerForm.password} onChange={e => setRegisterForm({...registerForm, password: e.target.value})} />
            
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={registerForm.confirmPassword}  onChange={e => setRegisterForm({...registerForm, confirmPassword: e.target.value})}/>
            
        </Form.Group>
        <div className="button-container">
        <Button variant="primary" onClick={registerHandler}>Register</Button>
            <Link to="/login">
            <p >Already Registered? Continue with Login</p>
            </Link>
        </div>
        
        </Form>
        {
            error ?  
             <> <Alert variant="danger" className="signup-alert">
            {error}</Alert> 
                    {/* <ToastComponent show={showToast} title={error} body={error} closeHandler={() => setToast(false)}></ToastComponent> */}
                   </> : null
        }
            </div>
        
        </Container>
        </>
    )
}

export default Register;