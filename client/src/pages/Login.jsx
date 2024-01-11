import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";
import Header from "../components/Header/Header";
// import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
<>
    <Header />
    {/* <Navbar /> */}

    <Container>
      <Row>
     
          <h1>Login</h1>
         
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/me">back to the homepage.</Link>
              </p>
            ) : (
              <Form onSubmit={handleFormSubmit} id="loginForm">
                <Row>
        <Col>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                
        </Col>
        </Row>

        <Row>
        <Col>
           <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />

          </Col>
          </Row>

          <Row>
        <Col>
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>

                </Col>
                </Row>
              </Form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          
     
      </Row>
    </Container>

    </>
  );
};

export default Login;
