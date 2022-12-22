import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import WaysHub from "../assets/images/WaysHub.png";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

function Auth() {
  let navigate = useNavigate();

  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      navigate("/");
    }
  };
  checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <>
      <Container className="p-3" style={{height:"100vh"}}>
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <Stack
              direction="vertical"
              className="d-flex flex-column justify-content-center"
            >
              <Image className="w-75" src={WaysHub} />
              <Card.Text className="text-white fs-5 fw-light w-75">
                Join now, share your creations with another people and enjoy
                other creations
              </Card.Text>
              <div>
                <Button
                  onClick={switchLogin}
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#FF7A00",
                    border: "none",
                    width: "25%",
                    marginRight:"3%"
                  }}
                  className="mt-5 py-2 fw-bold fs-5 text-white"
                >
                  Sign In
                </Button>
                <Button
                  onClick={switchRegister}
                  variant="primary"
                  type="submit"
                  style={{
                    border: "none",
                    width: "25%",
                    color:"white"
                  }}
                  className="mt-5 py-2 fw-bold fs-5 btn-dark"
                >
                  Sign Up
                </Button>
              </div>
            </Stack>
          </Col>
          <Col>{isRegister ? <Register /> : <Login />}</Col>
        </Row>
      </Container>
    </>
  );
}

export default Auth;
