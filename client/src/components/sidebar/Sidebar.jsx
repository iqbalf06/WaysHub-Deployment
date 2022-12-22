import React from "react";
import { Card, Container, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icon/HomeIcon.svg";
import SubscriptionIcon from "../../assets/icon/SubscriptionIcon.svg";
import WaysHubIcon from "../../assets/images/WaysHubIcon.png";
import { useQuery } from 'react-query';
import Foto from "../../assets/images/blankphoto.png";
import { API } from '../../config/api';

function Sidebar() {

    let { data: channels, refetch } = useQuery('channelsCache', async () => {
        const response = await API.get('/channels');
        return response.data.data;
      });
    //   console.log(channels, "ini channel");

      const navigate = useNavigate()
    const handleComponent = async(id) => {
        navigate("/creator/"+id)
        refetch()
        navigate(0)

    }


    return(
        <>
            <Container className="p-5 m-0" style={{ width:'25%', backgroundColor:'#161616', position:'fixed'}}>
                    <div className="ms-4 mb-4">
                    <Image src={WaysHubIcon} className="w-50 ms-5" />
                    </div>
                <Stack direction="vertical" style={{height:'650px', overflowY :"scroll", }}>
                    <Stack direction="horizontal" className="mb-4 btn ps-0" onClick={() => navigate("/")}>
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={HomeIcon} />
                        </div>
                        <Card.Text className="text-white">Home</Card.Text>
                    </Stack>

                    <Stack direction="horizontal" className="mb-4 btn ps-0">
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={SubscriptionIcon} />
                        </div>
                        <Card.Text className="text-white">Subscription</Card.Text>
                    </Stack>

                    <Card.Text className="text-white fs-4" >Channel</Card.Text>
                    {channels?.map((channel, index) =>{
                    return(
                    <Stack key={index} direction="horizontal" className="mb-3 btn ps-0" onClick={() => handleComponent(channel.id)}>
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={channel?.photo === "" ? Foto : channel?.photo} style={{width:"40px", height:"40px", borderRadius:"10px", objectFit:"cover"}}/>
                        </div>
                        <Card.Text className="text-white">{channel.channelName}</Card.Text>
                    </Stack>
)})}
                </Stack>
            </Container>
        </>
    )
}

export default Sidebar