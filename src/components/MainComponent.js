import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import Header from './HeaderComponent.js';
import {NavLink} from 'react-router-dom';

/**
* @author
* @function Main
**/

const Main = (props) => {
  return(
    <div>
        <Header />
        
        {
          props.sidebar ? 
          <Container fluid>
            <Row>
              <Col md={2} className='sidebar'>
                <ul>
                  <li><NavLink href='/' to={'/'}>Home</NavLink></li>
                  <li><NavLink href='/category' to={'/category'}>Category</NavLink></li>
                  <li><NavLink href='/products' to={'/products'}>Products</NavLink></li>
                  <li><NavLink href='/orders' to={'/orders'}>Orders</NavLink></li>
                </ul>
              </Col>
              <Col md={10} style={{marginLeft:'auto'}}>
                {props.children}
              </Col>
            </Row>
          </Container>
          : 
          props.children
        }

    </div>
   )
 };

 export default Main;