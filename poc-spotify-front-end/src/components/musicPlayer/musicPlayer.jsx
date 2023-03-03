import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  convertPercentageToDecimal,
  convertToHoursMinutesSeconds,
  getPercentage,
} from "../../utils/numberUtils";
import { AudioControls } from "./audioControls/audioControls";

import "./musicPlayer.css";
import { PlayerControls } from "./playerControls/playerControls";

function MusicPlayer() {
  const [fileName, setFileName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [elapsedTime, setElapsedTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [musicDuration, setMusicDuration] = useState("0:00");

  const player = useRef();

  useEffect(() => {
    fetch("http://localhost:8080/music", {
      headers: {
        "Accept-Encoding": "identity",
        // Range: "bytes=0-999999",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const contentDispositionHeader = response.headers.get(
          "Content-Disposition"
        );

        const fileNameFromHeader = contentDispositionHeader
          .split("filename=")[1]
          .split(".")[0];
        setFileName(fileNameFromHeader);
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
    setIsMuted(!isMuted);
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
      <div className="music-player__column">{fileName}</div>
      <div className="music-player__column">
        <PlayerControls
          {...{
            musicUrl,
            player,
            onTimeUpdate,
            onDurationChange,
            onClickPlay,
            isPlaying,
            progress,
            onChangeProgress,
            musicDuration,
            elapsedTime,
          }}
        />
      </div>
      <div className="music-player__column">
        <AudioControls {...{ onClickMute, onChangeVolume, isMuted }} />
      </div>
    </div>
  );
}

export default MusicPlayer;
