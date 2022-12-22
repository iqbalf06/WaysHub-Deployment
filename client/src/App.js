import React from "react";
import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap"
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext'; 
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import AddVideo from "./pages/AddVideo";
import Creator from "./pages/Creator";
import MyChannel from "./pages/MyChannel"
import EditChannel from "./pages/EditChannel"
import VideoDetail from "./pages/VideoDetail"
import Auth from "./pages/Auth"


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => { 
    // Redirect Auth
    if (!localStorage.token) {
      navigate('/auth');
    }

    setAuthToken(localStorage.token)
  }, [localStorage]);
  // console.log(state, "ini data state");
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // console.log("check auth", response)
      
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      console.log(response, "ini response");
  
      let payload = response.data.data;
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      // console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);


  return (
    <>
        <Routes>
          <Route exact path='/auth' element={<Auth />} />
        </Routes>
        <Container className="p-0 m-0" style={{ maxWidth: '100%' }}>
          <Row lg={2} className="p-0 m-0">
            <Col lg={3} className="p-0 m-0">
              <Sidebar />
            </Col>
            <Col lg={9} className="p-0 m-0">
              
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/addvideo' element={<AddVideo />} />
                <Route exact path='/creator/:id' element={<Creator />} />
                <Route exact path='/mychannel' element={<MyChannel />} />
                <Route exact path='/editchannel' element={<EditChannel />} />
                <Route exact path='/videodetail/:id' element={<VideoDetail />} />

              </Routes>
            </Col>
          </Row>
        </Container>

    
    </>
  );
}

export default App;
