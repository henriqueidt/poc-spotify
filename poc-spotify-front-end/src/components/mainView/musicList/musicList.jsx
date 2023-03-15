import { useContext } from "react";
import { MusicContext } from "../../../App";
import "./musicList.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const MusicList = () => {
  const { setPlayingMusic } = useContext(MusicContext);
  return (
    <table className="music-list">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>
            <AccessTimeIcon />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr onClick={() => setPlayingMusic("5th symphony - bethoveen")}>
          <td>1</td>
          <td>5th symphony - bethoveen</td>
          <td>Classic music</td>
          <td>3:45</td>
        </tr>
        <tr onClick={() => setPlayingMusic("6th symphony - mozart")}>
          <td>2</td>
          <td>6th symphony - mozart</td>
          <td>Classic music</td>
          <td>4:22</td>
        </tr>
      </tbody>
    </table>
  );
};
