import Navbar from "@/components/Navbar";
import { ITrack } from "@/types/track";
import { Button, Grid, TextField } from "@mui/material";
// import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout"
import { useInput } from "@/hooks/useInput";

const TrackPage = ({serverTrack}) => {
  const[track,setTrack]=useState<ITrack>(serverTrack)
  const username=useInput('')
  const text=useInput('')
  const addComment =async ()=>{
    try{
      const response=await axios.post('http://localhost:5000/tracks/comment',{
        username:username.value,
        text:text.value,
        trackId:track._id
      
      })
      setTrack({...track,comments:[...track.comments,response.data]})
    }catch(e){
console.log(e)
    }

  }
    //  const track: ITrack = {
    //     _id: "1",
    //     name: "Track 1",
    //     artist: "Artist 1",
    //     text: "FFFFFFFFFFFFF",
    //     listens: 5,
    //     audio: "http://localhost:5000/public/JoeDassin.mp3",
    //     picture: "http://localhost:5000/public/flagman.jpg",
    //     comments: [],
    //   };
      const router = useRouter();
    return (
      
        <div>
          {/* <MainLayout title={"Music plateform - " + track.name+ " - " + track.artist} keywords={'Music, artist,' + track.name+ " , " + track.artist}> */}
          <Navbar />
              <Button
      variant={"outlined"}
      style={{ fontSize: 32 }}
      onClick={() => router.push("/tracks")}
     >
      To List
     </Button> 
     <Grid container style={{ margin: "20px 0" }}>
       <img src={'http://localhost:5000/'+track.picture} width={200} height={200} alt="picture" ></img>
       {/* <img src='./flagman.jpg'  width={200} height={200} ></img> */}
       <div style={{ margin: "20px 0" }}>
         <h1>Name - {track.name}</h1>
         <h1> Artist - {track.artist}</h1>
         <h1>Listens - {track.listens}</h1>
      </div>
      </Grid>
      <h1> Tracks Description</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid>
        <TextField
        label="Your name"
        fullWidth
        {...username}
        />
         <TextField
        label="Comment"
        fullWidth
        multiline
        rows={4}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map(comment=>
          <div key={comment.username}>
            <div>Autor - {comment.username}</div>
            <div>Comment - {comment.text}</div>
          </div>
        )}
      </div>
      {/* </MainLayout> */}
     
        </div>
    );
};
// const TrackPage = () => {
// //   const track: ITrack = {
// //     _id: "1",
// //     name: "Track 1",
// //     artist: "Artist 1",
// //     text: "FFFFFFFFFFFFF",
// //     listens: 5,
// //     audio: "http://localhost:5000/public/JoeDassin.mp3",
// //     picture: "http://localhost:5000/public/flagman.jpg",
// //     comments: [],
// //   };
// //   const router = useRouter();
  
//   return 

// <div>TRACK PAGE</div>;
// //   return
// //   <>
// //     {/* <Navbar /> */}
// //     <Button
// //       variant={"outlined"}
// //       style={{ fontSize: 32 }}
// //       onClick={() => router.push("/tracks")}
// //     >
// //       To List
// //     </Button>
// //     <Grid container style={{ margin: "20px 0" }}>
// //       {/* <img src={track.picture} width={200} height={200} ></img> */}
// //       {/* <div style={{ margin: "20px 0" }}> */}
// //         <h1>Name - {track.name}</h1>
// //         <h1> Artist - {track.artist}</h1>
// //         <h1>Listens - {track.listens}</h1>
// //       {/* </div> */}
// //     </Grid>
// // </>; 
// };

export default TrackPage;
export const getServerSideProps:GetServerSideProps= async({params})=>{
  const response=await axios.get('http://localhost:5000/tracks/'+params?.id)
return{
  props:{
    serverTrack:response.data
  }
}
}
