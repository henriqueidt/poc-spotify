import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import "./playerControls.css";
import { RangeInput } from "../../rangeInput/rangeInput";

export const PlayerControls = ({
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
}) => {
  return (
    <>
      <audio
        className="player-controls__audio"
        controls
        src={musicUrl}
        ref={player}
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>

      <button onClick={onClickPlay} className="player-controls__play-btn">
        {isPlaying ? (
          <PauseCircleIcon fontSize="large" />
        ) : (
          <PlayCircleIcon fontSize="large" />
        )}
      </button>
      <div className="player-controls__playback-bar">
        <div className="player-controls__playback-time">{elapsedTime}</div>
        <RangeInput onChangeProgress={onChangeProgress} progress={progress} />
        <div className="player-controls__playback-time">{musicDuration}</div>
      </div>
    </>
  );
};
