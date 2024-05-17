import React from "react";
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "./styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";
// eslint-disable-next-line react-hooks/rules-of-hooks
const{playTrack,pauseTrack,setActiveTrack}=useActions()
interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}
const play = (e)=>{
  //chtoby ne perebrasyvalo na stranitsu kakogo to tracka
  e.stopPropagation()
  setActiveTrack(track)
  playTrack()
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router=useRouter()
  return (
    <Card className={styles.track} onClick={()=>router.push('/tracks/'+track._id)}>
      {/* <IconButton onClick={e=>e.stopPropagation()}>{active ? <Pause /> : <PlayArrow />}</IconButton> */}
      <IconButton onClick={play}>{active ? <Pause /> : <PlayArrow />}</IconButton>
      <img width={70} height={70} src={'http://localhost:5000/'+track.picture }alt="picture"></img>
      {/* <img width={70} height={70} src='./flagman.jpg'></img> */}
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "o 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:/03:22</div>}
      <IconButton onClick={e=>e.stopPropagation()} style={{marginLeft:'auto'}}>
        <Delete/>
      </IconButton>
    </Card>
  );
};

export default TrackItem;
