import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Nav, NavItem, Navbar, NavbarBrand, NavbarToggler, NavLink, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap';
import { signout } from '../actions/auth';

/**
* @author
* @function Header
**/


const Header = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };

  const renderNonLoggedIn = () => {
    return(
      <Nav className='ms-auto' navbar>
            <NavItem>
              <NavLink href="/signin">Sign In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Sign up</NavLink>
            </NavItem>
          </Nav>
    );
  };

  const renderLoggedIn = () => {
    return(
      <Nav className='ms-auto' navbar>
            <NavItem>
              <NavLink onClick={logout}>Sign Out</NavLink>
            </NavItem>
            
          </Nav>
    );
  };

  return(
    <Navbar color="dark" dark expand="md" light style={{zIndex: 1}}>
        <NavbarBrand href="/">
          Admin Dashboard
        </NavbarBrand>
        <NavbarToggler onClick={() => {}} />
        <Collapse navbar>
          {auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()}
        </Collapse>
      </Navbar>
   )

 }

 export default Header;