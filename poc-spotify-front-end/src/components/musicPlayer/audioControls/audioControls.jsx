import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import "./audioControls.css";
import { RangeInput } from "../../rangeInput/rangeInput";

export const AudioControls = ({
  onClickMute,
  onChangeVolume,
  isMuted,
  volume,
}) => {
  return (
    <>
      <button onClick={onClickMute} className="audio-controls__mute-btn">
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </button>
      <RangeInput progress={volume} onChangeProgress={onChangeVolume} />
    </>
  );
};
