import React, { useEffect, useRef, useState } from "react";
import "../Style/videochat.css";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "@mui/material/Button";
import repeat from "../Image/Vector.png";
import { VscCalendar } from "react-icons/vsc";
import { Box, LinearProgress } from "@mui/material";
import video from "../video2.mp4";
import herefoto from "../Image/image 1.png"

function VideoChat() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playSpeed, setPlaySpeed] = useState(1);
  const [rangeValue, setRangeValue] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setRangeValue((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleError = (e) => {
      console.error('Video Error:', e);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleClose = () => {
    setClicked(false);
    videoRef.current.pause();
  };

  const handleRepeat = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleSpeedToggle = () => {
    if (videoRef.current) {
      const newPlaySpeed = playSpeed === 1 ? 2 : 1;
      videoRef.current.playbackRate = newPlaySpeed;
      setPlaySpeed(newPlaySpeed);
    }
  };

  const handleClick = () => {
    if (!clicked) {
      setClicked(!clicked);
      if (videoRef.current) {
        if (!clicked) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    }
  };

  return (
    <>
     <div className="video-chat">
     <div className="here" style={{display:clicked?"none":"block"}}>
        <img className="here-img" src={herefoto} alt="" />
            <p className="here-click">Here to help 🧡</p>
    </div>
        <div className={clicked ? "added-video" : "paused-video"} onClick={handleClick}>
        <video className={clicked ? "video" : "video-default"} controls={false} ref={videoRef} autoPlay loop>
          <source src={video} type="video/mp4" />
        </video>
        
        {clicked && (
          <div className="custom-controls">
            <Box sx={{ width: '100%', marginTop: '10px' }}>
              <LinearProgress variant="determinate" value={(currentTime / duration) * 100} />
            </Box>
            <div className="controls-top">
              <FaArrowLeft className="added-arrow" onClick={handleClose} />
              <div className="controls-right">
                <div className="added-time">
                  <span className="time">
                    {formatTime(currentTime)}/{formatTime(duration)}
                  </span>
                </div>
                <p className="x2" onClick={handleSpeedToggle}>
                  2X
                </p>
                <img
                  src={repeat}
                  alt=""
                  className="repeat-icon"
                  onClick={handleRepeat}
                />
              </div>
            </div>
            <div className="controls-bottom">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<VscCalendar className="calendar-icon" />}
                className="added-calendar"
              >
                Get a consultation!
              </Button>
            </div>
          </div>
        )}
      </div>
     </div>
      
    </>
  );
}

export default VideoChat;
