import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  convertPercentageToDecimal,
  convertToHoursMinutesSeconds,
  getPercentage,
} from "../../utils/numberUtils";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import "./musicPlayer.css";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [elapsedTime, setElapsedTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [musicDuration, setMusicDuration] = useState("0:00");

  const player = useRef();
  const progressRef = useRef();

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
    const { value } = target;

    setProgress(value);

    const newTime = convertPercentageToDecimal(player.current.duration * value);
    player.current.currentTime = newTime;
    onTimeUpdate();
  };

  // TODO -> Find a way not to rerender on every time change
  const onTimeUpdate = () => {
    const { currentTime, duration } = player.current;
    const time = convertToHoursMinutesSeconds(player.current.currentTime);
    setElapsedTime(time);
    if (duration) {
      setProgress(getPercentage(currentTime, duration));
    }
  };

  const onDurationChange = () => {
    const time = convertToHoursMinutesSeconds(player.current?.duration);
    setMusicDuration(time);
  };

  return (
    <div className="music-player">
      <audio
        controls
        src={musicUrl}
        ref={player}
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>

      <button onClick={onClickPlay}>
        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </button>
      <button onClick={onClickMute}>mute</button>
      <input type="range" name="volume" id="volume" onChange={onChangeVolume} />
      <div className="music-player__playback-bar">
        <div className="music-player__playback-time">{elapsedTime}</div>
        <div className="music-player__progress-container">
          <input
            ref={progressRef}
            style={{
              backgroundSize: `${progress}% 100%`,
            }}
            type="range"
            name="progress"
            id="progress"
            className="music-player__progress"
            onChange={onChangeProgress}
            value={progress}
            min={0}
            max={100}
          />
        </div>
        <div className="music-player__playback-time">{musicDuration}</div>
      </div>
    </div>
  );
}

export default MusicPlayer;
