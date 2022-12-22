import React, { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import { API } from "../../config/api";

function Register() {
  const navigate = useNavigate();

  document.title = "WaysHub";

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    channelName: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body);

      // Notification
      console.log(response);
      if (response.data.code === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register Successfully
          </Alert>
        );
        setMessage(alert);
        setForm({
          email: "",
          password: "",
          channelName: "",
          description: "",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Register Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Register Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
          <Container className="p-3" style={{ height: "95vh" }}>
      <Col>
        <Container
          className="rounded-4 p-5"
          style={{
            backgroundColor: "#161616",
            width: "80%",
            marginTop: "8vh",
          }}
        >
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Label className="fs-1 mb-5 fw-bold text-white">
              Sign Up
            </Form.Label>
            {message && message}
            <Form.Group controlId="formEmail">
              <Form.Control
                className="mb-4 py-2 fs-5 text-white"
                style={{
                  borderColor: "#BCBCBC",
                  borderWidth: "3px",
                  backgroundColor: "#555555",
                }}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Control
                className="py-2 fs-5 text-white"
                style={{
                  borderColor: "#BCBCBC",
                  borderWidth: "3px",
                  backgroundColor: "#555555",
                }}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formChannelName">
              <Form.Control
                className="py-2 fs-5 text-white"
                style={{
                  borderColor: "#BCBCBC",
                  borderWidth: "3px",
                  backgroundColor: "#555555",
                }}
                type="text"
                placeholder="Channel Name"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formChannelDescription">
              <Form.Control
                className="py-2 fs-5 text-white"
                style={{
                  borderColor: "#BCBCBC",
                  borderWidth: "3px",
                  backgroundColor: "#555555",
                  resize: "none",
                }}
                as="textarea"
                rows={3}
                placeholder="Channel Description"
                name="description"
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#FF7A00", border: "none" }}
              className="py-2 fw-bold fs-5 w-100 text-white"
            >
              Sign Up
            </Button>
          </Form>
        </Container>
      </Col>
      </Container>
    </>
  );
}

export default Register;
