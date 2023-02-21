import React, { useState, useEffect } from "react";

function MusicPlayer() {
  const [musicUrl, setMusicUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/music", {
      headers: {
        "Accept-Encoding": "identity",
        Range: "bytes=0-999999",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .then((response) => response.blob())
      .then((response) => setMusicUrl(URL.createObjectURL(response)))
      .catch((error) => {
        console.error("Error fetching music:", error);
      });
  }, []);

  return (
    <audio controls src={musicUrl}>
      Your browser does not support the <code>audio</code> element.
    </audio>
  );
}

export default MusicPlayer;
