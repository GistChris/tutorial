import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import StepWrapper from "@/components/StepWrapper";
import MainLayout from "@/components/layouts/MainLayout";
import { useInput } from "@/hooks/useInput";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";

// const Create = () => {
const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  /////////////////////////////////////////////
//   const [picture, setPicture] = useState(null);
//   const [audio, setAudio] = useState(null);
//////////////////////////////////////
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");
  ///////////////////////////////////////////
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const router = useRouter();
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post("http://localhost:5000/tracks", formData)
        .then((resp) => router.push("/tracks"))
        .catch((e) => console.log(e));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    // <MainLayout>
    <>
      {/* <Navbar  /> */}
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label={"Track name"}
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label={"Artist name"}
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label={"Tack text"}
              multiline
              rows={5}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Upload cover</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Upload audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent={"space-between"}>
              <Button disabled={activeStep === 0} onClick={back}>
                Back
              </Button>
              <Button onClick={next}>Next</Button>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Player></Player>
    </>
    // </MainLayout>
  );
};

export default Create;
