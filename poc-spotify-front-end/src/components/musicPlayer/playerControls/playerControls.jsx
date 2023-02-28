import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import "./playerControls.css";

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
        <div className="player-controls__progress-container">
          <input
            style={{
              backgroundSize: `${progress}% 100%`,
            }}
            type="range"
            name="progress"
            id="progress"
            className="player-controls__progress"
            onChange={onChangeProgress}
            value={progress}
            min={0}
            max={100}
          />
        </div>
        <div className="player-controls__playback-time">{musicDuration}</div>
      </div>
    </>
  );
};
