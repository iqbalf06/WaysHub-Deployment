import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Image,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import AttachIcon from "../assets/images/AttachIcon.png";
import UploadVideoIcon from "../assets/images/UploadVideoIcon.png";
import Navbar from "../components/navbar/Navbar";
import { API } from "../config/api";

function AddVideo() {
  document.title = "WaysHub";

  let navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: "",
  }); //video data

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
    }
  };

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // Store data with formAddVideo as object
      const formAddVideo = new FormData();
      formAddVideo.set("title", form.title);
      formAddVideo.set("thumbnail", form.thumbnail[0]);
      formAddVideo.set("description", form.description);
      formAddVideo.set("video", form.video[0]);

      console.log(form);

      // Insert product data
      const response = await API.post("/video", formAddVideo, config);
      console.log(response);

      navigate("/mychannel");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
    <Navbar/>
    <Container className="py-3 px-5" style={{ marginTop: "2%" }}>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Label className="text-white fs-4 fw-bold mb-4">
          Add Video
        </Form.Label>

        <Stack direction="horizontal">
          <Form.Label className="me-auto w-100">
            <Form.Control
              className="mb-3 py-1 fs-5"
              style={{
                borderColor: "#BCBCBC",
                borderWidth: "3px",
                backgroundColor: "#555555",
                color: "white",
              }}
              type="text"
              placeholder="Video Title"
              name="title"
              onChange={handleChange}
            />
          </Form.Label>
          {/* {preview && ( */}
          <Form.Label
            className="ms-3 px-2 py-1 mb-4 text-secondary fw-normal rounded-2"
            style={{
              width: "30%",
              border: "solid",
              borderWidth: "3px",
              borderColor: "#BCBCBC",
              backgroundColor: "#555555",
              color: "rgb(210,210,210,0.25)",
              cursor: "pointer",
            }}
          >
            <Stack direction="horizontal">
              <Card.Text className="d-flex flex-column justify-content-center m-0 fs-5">
                Attach Thumbnail
              </Card.Text>
              <Image src={AttachIcon} className="ms-auto" />
            </Stack>
            <Form.Control
              type="file"
              style={{ width: "100%" }}
              hidden
              onChange={handleChange}
              name="thumbnail"
            />
          </Form.Label>
          {/* )} */}
        </Stack>

        <Form.Label className="me-auto w-100">
          <Form.Control
            className="mb-3 py-1 fs-5"
            style={{
              borderColor: "#BCBCBC",
              borderWidth: "3px",
              backgroundColor: "#555555",
              color: "white",
            }}
            as="textarea"
            rows="6"
            placeholder="Video Description"
            name="description"
            onChange={handleChange}
          />
        </Form.Label>

        <Form.Label
          className="px-2 py-1 mb-4 text-secondary fw-normal rounded-2"
          style={{
            width: "20%",
            border: "solid",
            borderWidth: "3px",
            borderColor: "#BCBCBC",
            backgroundColor: "#555555",
            color: "rgb(210,210,210,0.25)",
            cursor: "pointer",
          }}
        >
          <Stack direction="horizontal">
            <Card.Text className="d-flex flex-column justify-content-center m-0 fs-5">
              Upload Video
            </Card.Text>
            <Image src={UploadVideoIcon} className="ms-auto" />
          </Stack>
          <Form.Control
            type="file"
            style={{ width: "100%" }}
            hidden
            onChange={handleChange}
            name="video"
          />
        </Form.Label>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "#FF7A00", border: "none" }}
          className="py-2 fw-bold fs-5 w-100 text-white"
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Add"
          )}
        </Button>
      </Form>
    </Container>
    </>
  );
}

export default AddVideo;
