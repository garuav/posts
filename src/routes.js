import React from 'react'
import {  BrowserRouter as Router,  Route} from 'react-router-dom'
import Home from './components/home/home'
import Login from './components/login/login'
import Register from './components/signup/signup'
import { GetLocalStorage } from './utils/firebase/service'


const Routes = () => {

    const authUser = () => {
        if (GetLocalStorage('userDetails')) {
            return <Home />
        } 
        return <Login />
    }
    return(
        <Router basename="/">
            <Route exact path="/" render={authUser}/>
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

         </Router>
    )
}

export default Routes