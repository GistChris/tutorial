import Navbar from "@/components/Navbar";
import MainLayout from "@/components/layouts/MainLayout";
import { Container, TextField } from "@mui/material";
import Create from "./create";
import React, { useState } from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks, searchTracks } from "@/store/actions-creators/track";
import { useDispatch } from "react-redux";
// import MainLayout from "@/components/layouts/MainLayout";
const Index = () => {
  const router = useRouter();
  // const{} =useTypedSelector(state=>state.player)
  // const {} = useActions()
  // const tracks:ITrack[] = [
  //   {_id:'1',name:'Track 1',artist:'Artist 1', text:'FFFFFFFFFFFFF',listens:5,audio:"http://localhost:5000/public/JoeDassin.mp3",picture:"http://localhost:5000/public/flagman.jpg",comments:[]},
  //   {_id:'2',name:'Track 2',artist:'Artist 2', text:'rrrrrrrr',listens:5,audio:"http://localhost:5000/public/JoeDassin.mp3",picture:"http://localhost:5000/public/flagman.jpg",comments:[]},
  //   {_id:'3',name:'Track 3',artist:'Artist 3', text:'vvvvvvvvvvvvv',listens:5,audio:"http://localhost:5000/public/JoeDassin.mp3",picture:"http://localhost:5000/public/flagman.jpg",comments:[]},
  // ];
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    // setTimer(
    //   setTimeout( async() => {
    //     await dispatch(await searchTracks(e.target.value));
    //   }, 500)
    // );
    await dispatch(await searchTracks(e.target.value));
  };
  if (error) {
    return;
    //  <MainLayout title={'Track list - Music plateform'}>
    <h1>{error}</h1>;
      // </MainLayout> 
  }
  return (
    <>
      <Navbar />
      <Grid container justifyContent={"center"} style={{ margin: "90px 0" }}>
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent={"space-between"}>
              <h1>Tracks List</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Load track
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </>
  );
};
// const Index = () => {
//   return (
//     <>
//       <Navbar />
//       <Container style={{margin:'90px 0'}}>
//       <div>Tracks List</div>
//       </Container>
//       <Create/>

//     </>
//   );
// };

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
  }
);
