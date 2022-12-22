import React from "react";
import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import Moment from "react-moment";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DateIcon from "../../assets/icon/DateIcon.svg";
import ViewsIcon from "../../assets/icon/ViewsIcon.svg";
import { API } from "../../config/api";

function SideVideoList() {
  let { data: getallvideo, refetch } = useQuery("allvideosCaches", async () => {
    const response = await API.get("/videos");
    return response.data.data;
  });
  //   console.log(getallvideos, "getall?");

  const navigate = useNavigate();

  const handleView = async (id, request) => {
    const response = await API.patch("/views/" + id);
    // console.log("responseview", response);
    refetch();
    navigate("/videodetail/" + id);
    navigate(0);
  };

  return (
    <>
      {getallvideo?.map((element, index) => (
        <Stack
          direction="Vertical"
          key={index}
          gap={4}
          className="ps-3 pe-5 mb-3"
        >
          <Stack direction="vertical" onClick={() => handleView(element.id)}>
            <Image src={element.thumbnail} className="mb-2 btn p-0" />
            <Card.Text className="text-white mb-3" style={{ fontSize: "15px", cursor:"pointer" }}>
              {element.title}
            </Card.Text>
            <Card.Text className="fs-6 mb-2" style={{ color: "#555555" }}>
              {element.channel.channelName}
            </Card.Text>
            <Row>
              <Col md={4}>
                <Stack direction="horizontal">
                  <div className="d-flex flex-column justify-content-center me-2">
                    <Image src={ViewsIcon} />
                  </div>
                  <Card.Text className="fs-6" style={{ color: "#555555" }}>
                    {element.viewcount}
                  </Card.Text>
                </Stack>
              </Col>
              <Col>
                <Stack direction="horizontal">
                  <div className="d-flex flex-column justify-content-center me-2">
                    <Image src={DateIcon} />
                  </div>
                  <Card.Text className="fs-6" style={{ color: "#555555" }}>
                    <Moment format="DD MMM YYYY">{element?.createdat}</Moment>
                  </Card.Text>
                </Stack>
              </Col>
            </Row>
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export default SideVideoList;
