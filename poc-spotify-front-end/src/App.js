import logo from "./logo.svg";
import "./App.css";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import { NavBar } from "./components/navBar/navBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MusicPlayer />
    </div>
  );
}

export default App;
