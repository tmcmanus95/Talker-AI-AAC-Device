import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";

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
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        <Link to="/">
          <h1 className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 mb-4 sm:mb-0 sm:ml-8 rounded-md">
            Home
          </h1>
        </Link>
        <ul className="flex sm:flex-row items-center ">
          <li>
            <Link
              to="/me"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 mb-4 mr-2 sm:mb-0 sm:ml-8 rounded-md"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 mb-4 mr-2 sm:mb-0 sm:ml-8 rounded-md"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 mb-4 mr-2 sm:mb-0 sm:ml-8 rounded-md"
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
