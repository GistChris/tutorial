import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import { ITrack } from "@/types/track";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import {} from "@/store/actions-creators/player";
let audio:any;
const Player = () => {
  const track: ITrack = {
    _id: "1",
    name: "Track 1",
    artist: "Artist 1",
    text: "FFFFFFFFFFFFF",
    listens: 5,
    audio: "http://localhost:5000/public/JoeDassin.mp3",
    picture: "http://localhost:5000/public/flagman.jpg",
    comments: [],
  };
  //   const active=false;
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setActiveTrack,
    setCurrentTime,
    setDuration,
  } = useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
      //  audio.src=track.audio
      //  audio.volume=volume/100
      //  audio.onloadedmetadata=()=>{
      //     setDuration(Math.ceil(audio.duration))
      //  }
      //  audio.ontimeupdate=()=>{
      //     setCurrentTime(Math.ceil(audio.currentTime))
      //  }
    }else{
        setAudio ()
        play()

    }
  }, [active]);

  const setAudio = () => {
    if (active) {
    //   audio.src = track.audio;
      audio.src ='http://localhost:5000/'+ active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };
  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  if(!active){
    return null
  }
  return (
    <div className={styles.player}>
      {/* <IconButton onClick={e=>e.stopPropagation()}>{active ? <Pause /> : <PlayArrow />}</IconButton> */}
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "o 20px" }}
      >
         {/* <div>{track.name}</div> */}
        <div>{active?.name}</div>
        {/* <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div> */}
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
