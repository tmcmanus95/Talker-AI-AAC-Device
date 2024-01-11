import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";

import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function NavbarMain() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <section>

      <Navbar>

          {Auth.loggedIn() ? 
          (
            <>
              <Link to="/me"><button>View My Profile</button></Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
            </>
          )}
   

      </Navbar>

    </section>
  );
}