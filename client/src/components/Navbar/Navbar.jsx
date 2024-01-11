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

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {Auth.loggedIn() ? 
          (
            <>
           
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                <button>View My Profile</button>
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>

<Link className="btn btn-lg btn-primary m-2" to="/login">
              <button><Link to="/login">Login</button>
</Link>
            

              <Link className="btn btn-lg btn-light m-2" to="/signup">
              <button>
                Signup
                </button>
              </Link>
            </>
          )}
        </div>

    
      </Navbar>


    </section>
  );
}