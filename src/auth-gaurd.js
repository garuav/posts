import { Route, Redirect } from 'react-router-dom'
const AuthGaurd = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={ props =>
            props.isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          } />
    )
}

export default AuthGaurd;