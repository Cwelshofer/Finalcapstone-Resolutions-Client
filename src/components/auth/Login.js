//login page
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Anchor,
  Form,
  Layer,
} from "grommet";
import { Button, TextInput, FormField, Heading, Pane } from "evergreen-ui"
import "./auth.css"

export const Login = (props) => {
  const user = useRef();
  const password = useRef();

  const [show, setShow] = useState();
  const [showUser, setShowUser] = useState();

  // see if user already exists
  const existingUserCheck = () => {
    return fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        return user !== undefined ? user : false;
      });
  };

  const handleLogin = (e) => {
    console.log(user.current.value, password.current.value);
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists.valid) {
        localStorage.setItem("resolution_user_id", exists.token);
        props.history.push("/home");
      } else if (exists.valid != true) {
        setShow(true);
      } else if (!exists) {
        setShowUser(true);
      }
    });
  };

  return (
    <Pane direction="column" animation="fadeIn">
      <Pane className="container--login">
        {showUser && (
          <Layer>
            <Heading level="3">User does not exist</Heading>
            <Button
              label="Close"
              className="button--close"
              onClick={() => setShowUser(false)}
            />
          </Layer>
        )}
        {show && (
          <Layer>
            <Heading level="3">Password does not match</Heading>
            <Button
              className="button--close"
              label="Close"
              primary
              onClick={() => setShow(false)}
            />
          </Layer>
        )}
      </Pane>
  
        <h2 className="friends">Friends and Family Resolutions</h2>
        <h3 className="friends">Sign In</h3>
        <Form className="form--login" onSubmit={handleLogin}>
          <FormField label="Email address" htmlFor="inputEmail">
            <TextInput
              ref={user}
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
          </FormField>
          <FormField label="Password" htmlFor="inputPassword">
            <TextInput
              ref={password}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </FormField>
          <FormField>
           
              <Button
                size="large"
                label="sign in"
                fill={false}
                margin="small"
                pad="small"
                primary
                type="submit"
              > Sign In </Button>

          </FormField>
        </Form>
      <Pane className="link--register">
     <Link
          as={Link}
          to="/register"
          title="register"
          href="/register"
          margin="small"
          justify="center"
        >
          Not a member yet?
       </Link>
      </Pane>
    </Pane>
  );
};
