import React, { useEffect, useRef } from 'react';
import { Col, Container, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetUsers, GetLocalStorage } from '../../utils/firebase/service';
import { getUers } from '../../utils/redux/users/userActions';
import Posts from '../posts/posts';
import Users from '../users/users';
import Loader from '../loader/loader'
import './home.scss'


const Home = () => {
    const spinnerState = useSelector(state => state.spinner);
    console.log('spinnerState = ',spinnerState)
    const dipatch = useDispatch()
    let isMounted = useRef(false);
    useEffect(() => {
        GetUsers().then(response => {
            console.log('response = > ', response )
            if(response && response.length > 0 &&  !isMounted.current) {
                // setusers(response)
                const userDetails = GetLocalStorage('userDetails');
                const userList = response.filter(user => user.UID !== userDetails.UID)
            dipatch(getUers(userList))
            }
        }).catch(err => {
            console.log('error while fetching users = ',err)
        })
        return () => {
            isMounted.current= true;
           }
    }, [])
    const rowStyle = {
        height: "100%"
    }
    return (
        <Container fluid className="home-page">
            {
                spinnerState.isLoading && <Loader />
            }
            <Row style={rowStyle}>
                <Col md={12}>
                    Top Section 
                </Col>
                <Col md={8} className="main-panel">
                    <Posts />
                </Col>
                <Col md={4} className="sidebar-panel">
                     {/* <Users/> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;