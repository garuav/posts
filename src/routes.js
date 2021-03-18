import React from 'react'
import {  BrowserRouter as Router,  Route} from 'react-router-dom'
import AuthGaurd from './auth-gaurd'
import Home from './components/home/home'
import Login from './components/login/login'
import Register from './components/signup/signup'
import { GetLocalStorage } from './utils/firebase/service'


const Routes = () => {
    const getRootRoute = () =>  isAuthUser() ? <Home /> : <Login />
    
    const isAuthUser = () => {
        if (GetLocalStorage('userDetails')) {
            return true
        } 
        return false
    }

    return(
        <Router basename="/">
             <Route exact path="/" render={getRootRoute}/>
            <Route path="/login" component={Login} isAuthenticated={isAuthUser()}/>
            <Route path="/register" component={Register} isAuthenticated={isAuthUser()} />
            <AuthGaurd exact path="/home" component={Home} isAuthenticated={isAuthUser()} />
         </Router>
    )
}

export default Routes