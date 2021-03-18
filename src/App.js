import './App.scss';
import {Container} from 'react-bootstrap'
import Routes from './routes'
import { useEffect } from 'react';
import firebase from 'firebase';
import { FIREBASEREFS } from './utils/common/common.constant'
import { GeneratePushNotification, GetLocalStorage, SetLocalStorage} from './utils/firebase/service'
import { Provider } from 'react-redux';
import store from './utils/redux/store';

(function () {
  firebase.initializeApp(FIREBASEREFS.firebaseConfig);
})()

function App() {

  useEffect(() => {
    if(!GetLocalStorage('device_token')) {
      GeneratePushNotification().then((token) => {
        console.log('token = ', token);
        SetLocalStorage('device_token', token)
      }).catch(error => {
        console.log('error = ', error);
      });
    }
   
    firebase.analytics();
  }, [])
  return (
    <Provider store={store}>
     <Container fluid>
       <Routes></Routes>
      {/* <Login /> */}
    </Container>
    </Provider>
  );
}

export default App;
