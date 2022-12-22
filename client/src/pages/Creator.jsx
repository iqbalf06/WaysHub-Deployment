import React from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Image,
    Row,
    Stack,
} from "react-bootstrap";
import Moment from "react-moment";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import DateIcon from "../assets/icon/DateIcon.svg";
import ViewsIcon from "../assets/icon/ViewsIcon.svg";
import Cover from "../assets/images/blank-cover.png";
import Foto from "../assets/images/blankphoto.png";
import Navbar from "../components/navbar/Navbar";
import { API } from "../config/api";

function Creator() {
  const navigate = useNavigate();
  const { id } = useParams();

  let { data: videocreator } = useQuery("creatorCache", async () => {
    const response = await API.get("/creator/" + id);
    // console.log(response, "resp");
    return response.data.data;
  });

  let { data: creator, refetch } = useQuery("channelidCaches", async () => {
    const response = await API.get("/channel/" + id);
    console.log(response, "resp");
    return response.data.data;
  });
  //   console.log(creator, "ada creator?");

  const handleView = async (id) => {
    const response = await API.patch("/views/" + id);
    navigate("/videodetail/" + id);
  };

  return (
    <>
      <Navbar />
      <div>
        <Image
          src={creator?.cover === "" ? Cover : creator?.cover}
          style={{
            height: "18vh",
            width: "100%",
            marginTop: "2%",
            objectFit: "cover",
          }}
        />
      </div>
      <Container className="px-5 m-0 mt-4">
        <Stack direction="horizontal" className="mb-4">
          <Image
            src={creator?.photo === "" ? Foto : creator?.photo}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
            className="me-4"
          />
          <Stack direction="vertical">
            <Card.Text className="text-white fs-3 mb-0">
              {creator?.channelName}
            </Card.Text>
            <Card.Text style={{ color: "#F0F0F0" }}>120K Subscriber</Card.Text>
          </Stack>
          <Button
            className="py-2"
            style={{ backgroundColor: "#FF7A00", border: "none", width: "15%" }}
          >
            Subscribe
          </Button>
        </Stack>
        <hr style={{ borderTop: "3px solid #C2C2C2" }} />

        <Row lg={4}>
          {videocreator?.map((element) => (
            <Col
              className="mb-4"
              onClick={() => handleView(element.id)}
              style={{ cursor: "pointer" }}
            >
              <Stack direction="vertical">
                <Image src={element?.thumbnail} className="mb-2" />
                <Card.Text
                  className="text-white mb-3"
                  style={{ fontSize: "15px" }}
                >
                  {element?.title}
                </Card.Text>
                <Card.Text className="fs-6 mb-2" style={{ color: "#555555" }}>
                  {element?.channel.channelName}
                </Card.Text>
                <Row>
                  <Col md={4}>
                    <Stack direction="horizontal">
                      <div className="d-flex flex-column justify-content-center me-2">
                        <Image src={ViewsIcon} />
                      </div>
                      <Card.Text className="fs-6" style={{ color: "#555555" }}>
                        {element?.viewcount}
                      </Card.Text>
                    </Stack>
                  </Col>
                  <Col>
                    <Stack direction="horizontal">
                      <div className="d-flex flex-column justify-content-center me-2">
                        <Image src={DateIcon} />
                      </div>
                      <Card.Text className="fs-6" style={{ color: "#555555" }}>
                        <Moment format="DD MMM YYYY">
                          {element?.createdat}
                        </Moment>
                      </Card.Text>
                    </Stack>
                  </Col>
                </Row>
              </Stack>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Creator;
