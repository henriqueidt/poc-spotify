import "./rangeInput.css";

export const RangeInput = ({ progress, onChangeProgress }) => {
  return (
    <div className="range-input">
      <input
        style={{
          backgroundSize: `${progress}% 100%`,
        }}
        type="range"
        name="progress"
        id="progress"
        className="range-input__input"
        onChange={onChangeProgress}
        value={progress}
        min={0}
        max={100}
      />
    </div>
  );
};
