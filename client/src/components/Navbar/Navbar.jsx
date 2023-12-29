import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section>
      <nav className="py-4 sm:py-10 mb-4 sm:mb-12  flex flex-col sm:flex-row justify-between items-center mx-5">
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
