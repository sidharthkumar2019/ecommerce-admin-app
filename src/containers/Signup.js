import React, { useEffect, useState } from 'react'
import Main from '../components/MainComponent';
import {Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../actions';

/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  }, [user.loading]);

  const userSignUp = (e) => {
    e.preventDefault();

    const user = {firstName, lastName, email, password};

    dispatch(signup(user));
  };

  if (auth.authenticate)  return <Navigate to={'/'} />;

  if (user.loading) return <Spinner>Loading...</Spinner>;

  return(
    <Main>
      <Row>
        <p style={{color: 'green', textAlign: 'center'}}>
          {user.message}!
        </p>
      </Row>
      <Row style={{marginTop:'50px', justifyContent:'center'}}>
        <Col md={6}>
          <Form onSubmit={userSignUp}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">First Name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>  
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Last Name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>  
            </Col>
          </Row>

          <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="enter email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="enter password"
                type="password"
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

export default Signup;