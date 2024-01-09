import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function NavbarMain() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <section>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                View My Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>
              <Nav.Link to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Container>
        <Navbar.Brand to="/">
          <h4>
            Home
          </h4>
        </Navbar.Brand>
        <ul className="flex sm:flex-row items-center ">
          <li>
            <Link
              to="/me"
              className="me-auto"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="me-auto"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="me-auto"
            >
              Signup
            </Link>
          </li>
        </ul>
      </Navbar>
    </section>
  );
}
