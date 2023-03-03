import "./iconButton.css";

export const IconButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="icon-button">
      {children}
    </button>
  );
};
