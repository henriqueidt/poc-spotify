import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import "./audioControls.css";

export const AudioControls = ({ onClickMute, onChangeVolume, isMuted }) => {
  return (
    <>
      <button onClick={onClickMute} className="audio-controls__mute-btn">
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </button>
      <input type="range" name="volume" id="volume" onChange={onChangeVolume} />
    </>
  );
};
