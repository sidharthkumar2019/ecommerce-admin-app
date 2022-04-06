import React, { useEffect, useState } from 'react'
import Main from '../components/MainComponent';
import {Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import {login} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
* @author
* @function Signin
**/


const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  
  const dispatch = useDispatch();

  const userLogin = (event) => {
    event.preventDefault();

    const user = {
      email,password
    };
  
    dispatch(login(user));
  }

  if (auth.authenticate)  return <Navigate to={'/'} />;

  return(
    <Main>
      <Row style={{marginTop:'50px', justifyContent:'center'}}>
        <Col md={6}>
          <Form onSubmit={userLogin}>
            <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Main>
   )

 }

export default Signin;