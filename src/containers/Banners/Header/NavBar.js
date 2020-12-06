import { 
  Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button } from 'react-bootstrap';
import React, { useCallback, useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/Auth'
import ErrorBoundary from '../../../store/ErrorBoundary';
import axios from 'axios'
import jwtDecode from 'jwt-decode'


const Header = () => {
  let history = useHistory()
  const [user, setUser] = useState({})
  const accessToken = localStorage.getItem('access_token')
  
  const userId = jwtDecode(accessToken).user_id
  useEffect(() => {
    axios.defaults.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    axios.get(`/api/users/${userId}/`)
      .then(resp => {
        setUser(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const props = useSelector(state => (
    {
      ...state, 
      isAuthenticated: localStorage.getItem('access_token') !== null,
      loading: state.loading,
      error: state.error
    }))
  
  const dispatch = useDispatch()

  const logout = () => {
    try {
      dispatch(actions.logout())
      history.push('/login')
    } catch (e) {
      // alert(e)
      alert('unable to logout')
    }
  }


  return  (
    <div>
      {props.isAuthenticated ? loggedInNav(props, user, logout) : loggedOutNav(props, logout)}
    </div>
  )
}



export default Header

const loggedInNav = (props, user, logout) => (
  <Navbar bg="light" expand="lg" className="nav-bar" sticky={true}>
    <Navbar.Brand href="/">Unique Cover Letter Generator</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {/* <Nav.Link href="/">Home</Nav.Link> */}
        <Nav.Link href="/all-jobs">All Jobs</Nav.Link>
        <Nav.Link href="/job/form">Cover Letter Form</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Header>Welcome {user.preferred_name ? user.preferred_name : user.first_name}</NavDropdown.Header>
          <NavDropdown.Item href="/user-admin/">Account</NavDropdown.Item>
          <NavDropdown.Divider />
          <ErrorBoundary>
            {
              props.isAuthenticated ?
                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                :
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            }
          </ErrorBoundary>
        </NavDropdown>
      </Nav>
      {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
    </Navbar.Collapse>
  </Navbar>
)

const loggedOutNav = (props, logout) => (
  < Navbar bg="light" expand="lg" className="text-center" >
    <Navbar.Brand href="/">Unique Cover Letter Generator</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/login/">Login</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar >
)


  