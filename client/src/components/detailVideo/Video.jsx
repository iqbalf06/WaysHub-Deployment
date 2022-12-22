import React, { useState } from "react";
import { Button, Card, Container, Form, Image, Stack } from "react-bootstrap";
import Ratio from "react-bootstrap/Ratio";
import Moment from 'react-moment';
import { useMutation, useQuery } from "react-query";
import DateIcon from "../../assets/icon/DateIcon.svg";
import ViewsIcon from "../../assets/icon/ViewsIcon.svg";
import Foto from "../../assets/images/blankphoto.png";
import { API } from "../../config/api";

function Video({ response }) {

  // console.log("ini response", response);
  const [form, setForm] = useState({
    comment: "",
  }); //video data

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // Store data with formAddVideo as object
      const formAddComment = new FormData();
      formAddComment.set("comment", form.comment);

      // console.log(form);

      // Insert product data
      const dataComment = await API.post("/video/comments/" +response.id, formAddComment, config);
      // console.log(dataComment);
      refetch()

    } catch (error) {
      console.log(error);
    }
  });

  let { data: videocomment, refetch } = useQuery('videocommentCaches', async () => {
      const responsecomment = await API.get('/video/comment/'+response.id);
      return responsecomment.data.data;
    });
    // console.log("video comment", videocomment);

  return (
    <>
 
      <Container className="ps-5 pe-0 mb-4">
        <Stack direction="vertical">
          <div style={{ width: 660, height: "auto" }}>
            <Ratio aspectRatio="16x9">
              <embed type="video/mp4" src={response.video} />
            </Ratio>
          </div>
          {/* <Image src={VideoDetail} /> */}
          <Card.Text className="fs-5 fw-bold text-white">
            {response.title}
          </Card.Text>
          <Card.Text
            className="fw-bold text-secondary mb-3"
            style={{ fontSize: "13px" }}
          >
            {response.description}
          </Card.Text>
          <Stack direction="horizontal" gap={4}>
            <Stack direction="horizontal">
              <div className="d-flex flex-column justify-content-center me-2">
                <Image src={ViewsIcon} />
              </div>
              <Card.Text className="fs-6" style={{ color: "#555555" }}>
                {response.viewcount}
              </Card.Text>
            </Stack>

            <Stack direction="horizontal">
              <div className="d-flex flex-column justify-content-center me-2">
                <Image src={DateIcon} />
              </div>
              <Card.Text className="fs-6" style={{ color: "#555555" }}>
              <Moment format="DD MMM YYYY">
                {response.createdat}
            </Moment>
              </Card.Text>
            </Stack>
          </Stack>
          <hr style={{ borderTop: "3px solid #C2C2C2" }} />

          <Stack direction="horizontal">
            <div className="d-flex flex-column justify-content-center">
              <Image src={response?.channelphoto === "" ? Foto : response?.channelphoto } style={{width:"50px", height:"50px", borderRadius:"10px", objectFit:"cover"}} />
            </div>
<Form onSubmit={(e)=>handleSubmit.mutate( e)} style={{width:"100%"}}>
            <Form.Control
              className="py-1 fs-5 mb-3 mt-5 ms-1"
              style={{
                borderColor: "#BCBCBC",
                borderWidth: "3px",
                backgroundColor: "#555555",
                color: "rgb(210,210,210,0.25)",
              }}
              type="text"
              placeholder="Comment"
              name="comment"
              onChange={handleChange}
            />
            <Button
            onClick={(e)=>handleSubmit.mutate( e)}
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#FF7A00", border: "none" }}
              className="py-1 fw-bold fs-6 w-25 text-white float-end"
            >
              Add
            </Button>
          </Form>
          </Stack>
          <hr style={{ borderTop: "3px solid #C2C2C2" }} />
          <>
              {videocomment?.map((element, index)=>(
            <Stack direction="horizontal" key={index} className="mb-4">

              <div className="d-flex flex-column justify-content-center me-3">
                <Image
                  src={element?.channel.photo  === "" ? Foto : element?.channelphoto}
                  style={{ width: "50px", borderRadius:"10px", objectFit:"cover"}}
                  />
              </div>
              <Card
                className="w-100 border-0 p-2"
                style={{ backgroundColor: "#555555" }}
                >
                <Card.Text className="fs-5 fw-light text-light">
                  {element?.comment}
                </Card.Text>
              </Card>
            </Stack>
                ))}
          </>
        </Stack>
      </Container>
    </>
  );
}

export default Video;
