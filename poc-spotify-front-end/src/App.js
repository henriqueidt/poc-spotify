import "./App.css";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import { NavBar } from "./components/navBar/navBar";
import { MainView } from "./components/mainView/mainView";
import { createContext, useState } from "react";

export const MusicContext = createContext(null);

function App() {
  const [playingMusic, setPlayingMusic] = useState();

  return (
    <MusicContext.Provider value={{ playingMusic, setPlayingMusic }}>
      <div className="App">
        <div className="App__top-content">
          <NavBar />
          <MainView />
        </div>
        <MusicPlayer />
      </div>
    </MusicContext.Provider>
  );
}

export default App;
