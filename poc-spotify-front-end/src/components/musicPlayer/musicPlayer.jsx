import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  convertPercentageToDecimal,
  convertToHoursMinutesSeconds,
} from "../../utils/numberUtils";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [elapsedTime, setElapsedTime] = useState("0:00");
  const [musicDuration, setMusicDuration] = useState("0:00");

  const player = useRef();

  useEffect(() => {
    fetch("http://localhost:8080/music", {
      headers: {
        "Accept-Encoding": "identity",
        Range: "bytes=0-999999",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .then((response) => response.blob())
      .then((response) => setMusicUrl(URL.createObjectURL(response)))
      .catch((error) => {
        console.error("Error fetching music:", error);
      });
  }, []);

  const playAudio = () => {
    setIsPlaying(true);
    player.current.play();
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    player.current.pause();
  };

  const onClickPlay = () => {
    if (player.current.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  const switchMute = () => {
    player.current.muted = !player.current.muted;
  };

  const setVolume = (value) => (player.current.volume = value);

  const onClickMute = () => switchMute();

  const onChangeVolume = ({ target }) => {
    const rangeDecimal = convertPercentageToDecimal(target.value);
    setVolume(rangeDecimal);
  };

  const onChangeProgress = ({ target }) => {
    const newTime = convertPercentageToDecimal(
      player.current.duration * target.value
    );
    player.current.currentTime = newTime;
    onTimeUpdate();
  };

  // TODO -> Find a way not to rerender on every time change
  const onTimeUpdate = () => {
    const time = convertToHoursMinutesSeconds(player.current.currentTime);
    setElapsedTime(time);
  };

  const onDurationChange = () => {
    const time = convertToHoursMinutesSeconds(player.current?.duration);
    setMusicDuration(time);
  };

  return (
    <>
      <audio
        controls
        src={musicUrl}
        ref={player}
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>

      <div>{elapsedTime}</div>
      <div>{musicDuration}</div>

      <button onClick={onClickPlay}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </button>
      <button onClick={onClickMute}>mute</button>
      <input type="range" name="volume" id="volume" onChange={onChangeVolume} />
      <input
        type="range"
        name="progress"
        id="progress"
        onChange={onChangeProgress}
      />
    </>
  );
}

export default MusicPlayer;
