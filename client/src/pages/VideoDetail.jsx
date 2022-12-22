import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Moment from 'react-moment'
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import SideVideoList from "../components/detailVideo/SideVideoList"
import Videos from "../components/detailVideo/Video"
import Navbar from "../components/navbar/Navbar"
import { API } from "../config/api"

function VideoDetail() {

    const {id} = useParams()
    let { data: videodetail } = useQuery('videodetailCaches', async () => {
        const response = await API.get('/video/'+id);
        return response.data.data;
      });

      console.log("videodetail", videodetail);

      const datavideo = {
        channelphoto:videodetail?.channel.photo,
        id: id,
        title: videodetail?.title,
        video: videodetail?.video,
        description: videodetail?.description,
        viewcount: videodetail?.viewcount,
        createdat: videodetail?.createdAt
      }
    

    return (
        <>
        <Moment format="DD/MM/YYYY">
                19-04-1976
            </Moment>
        <Navbar/>
        <Container direction="vertical" className="p-0" style={{marginTop:'2%'}}>
            <Row lg={2} className="m-0 p-0">
                <Col lg={8} className="m-0 p-0">
                    <Videos response={datavideo} />
                </Col>
                <Col lg={4} className="m-0 p-0">
                    <SideVideoList />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default VideoDetail