import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";

import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function NavbarMain() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div class="container">
    <section>

      <Navbar>

          {Auth.loggedIn() ? 
          (
            <>
              <Link to="/me"><button class="btn">View My Profile</button></Link>
              <button onClick={logout} class="btn">Logout</button>
            </>
          ) : (
            <>
            <Link to="/login"><button className="btn">Login</button></Link>
            <Link to="/signup"><button className="btn">Signup</button></Link>
            </>
          )}
   

      </Navbar>

    </section>
    </div>
  );
}