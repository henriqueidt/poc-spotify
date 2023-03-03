import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import "./playerControls.css";
import { RangeInput } from "../../rangeInput/rangeInput";
import { IconButton } from "../../iconButton/iconButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

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

      <div className="player-controls__buttons">
        <IconButton>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={onClickPlay}>
          {isPlaying ? (
            <PauseCircleIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton>
          <SkipNextIcon />
        </IconButton>
      </div>
      <div className="player-controls__playback-bar">
        <div className="player-controls__playback-time">{elapsedTime}</div>
        <RangeInput onChangeProgress={onChangeProgress} progress={progress} />
        <div className="player-controls__playback-time">{musicDuration}</div>
      </div>
    </>
  );
};
