import React, { useContext, useRef, useState } from "react";
import { Card, Container, Form, Image, Overlay, Popover, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import { useQuery } from 'react-query';
import AddVideoIcon from "../../assets/icon/AddVideoIcon.svg";
import LogoutIcon from "../../assets/icon/LogoutIcon.svg";
import MyChannelLogo from "../../assets/icon/MyChannelLogo.svg";
import Foto from "../../assets/images/blankphoto.png";
import { API } from '../../config/api';

function Navbar() {
    let { data: mychannels } = useQuery('navbarcache', async () => {
        const response = await API.get('/mychannel');
        return response.data.data;
      });

    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)

    const [show, setShow] = useState(false);

    const [target, setTarget] = useState(null);

    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/auth")
    }

    return (
        <>
            <Container className="px-5" style={{ backgroundColor:'#0B0B0B', }}>
                <Stack direction="horizontal">
                    <Form.Group className="d-flex flex-column justify-content-center me-auto w-50 text-white" controlId="formSearch">
                        <Form.Control className="py-1 fs-5" style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)', }} type="search" placeholder="Search" />
                    </Form.Group>

                    <Stack direction="horizontal" className="btn me-3" onClick={() => navigate("/addvideo")}>
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={AddVideoIcon} />
                        </div>
                        <Card.Text className="text-white">Add Video</Card.Text>
                    </Stack>

                    <div ref={ref} >
                        <Image src={mychannels?.photo === "" ? Foto : mychannels?.photo} className="btn p-0" style={{width:"60px", height:"60px", borderRadius:"10px", objectFit:"cover"}} onClick={handleClick} />

                        <Overlay show={show} target={target} placement="bottom-end" container={ref}>
                            <Popover id="popover-contained" style={{backgroundColor:'#141414'}}>
                                <Popover.Body className="px-4">

                                    <Stack direction="horizontal" gap={3} className="mb-4 btn p-0" onClick={() => navigate("/mychannel")}>
                                        <div className="d-flex flex-column justify-content-center">
                                            <Image src={MyChannelLogo} />
                                        </div>
                                        <Card.Text className="text-white">My Channel</Card.Text>
                                    </Stack>

                                    <Stack direction="horizontal" gap={3} className="btn p-0" onClick={logout}>
                                        <div className="d-flex flex-column justify-content-center">
                                            <Image src={LogoutIcon} />
                                        </div>
                                        <Card.Text className="text-white">Logout</Card.Text>
                                    </Stack>

                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                </Stack>
            </Container>
        </>
    )
}

export default Navbar