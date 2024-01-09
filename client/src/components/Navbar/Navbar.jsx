import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <section>
      <nav className="py-4 sm:py-10 mb-4 sm:mb-12  flex flex-col sm:flex-row justify-between items-center mx-5">
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
  
  
<Button class="backtohomeBtn" to="/">
            Home
        </Button>
  
   
          )}
        </div>
        

      </nav>
    </section>
  );
}
