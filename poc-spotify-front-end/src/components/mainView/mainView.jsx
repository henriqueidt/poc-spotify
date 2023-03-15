import { MusicList } from "./musicList/musicList";
import "./mainView.css";

export const MainView = () => {
  return (
    <div className="main-view">
      <div>
        <MusicList />
      </div>
    </div>
  );
};
