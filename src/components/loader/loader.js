import React from 'react'
import { Spinner } from 'react-bootstrap';
import './loader.scss'

const Loader = () => {
    return ( <div className="loader-wrapper"> <Spinner animation="border" variant="primary" /> </div>)
}
export default Loader;