import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import "./audioControls.css";
import { RangeInput } from "../../rangeInput/rangeInput";
import { IconButton } from "../../iconButton/iconButton";

export const AudioControls = ({
  onClickMute,
  onChangeVolume,
  isMuted,
  volume,
}) => {
  return (
    <div className="audio-controls">
      <IconButton onClick={onClickMute}>
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
      {/* <button onClick={onClickMute} className="audio-controls__mute-btn">
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </button> */}
      <RangeInput progress={volume} onChangeProgress={onChangeVolume} />
    </div>
  );
};
