import React, { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { GoogleAuthProvider } from "./contexts/GoogleAuthContext";
import SidePanel from "./components/side-panel/SidePanel";
import ControlTray from "./components/control-tray/ControlTray";
import { Menu } from 'lucide-react';
import {Altair} from "./components/altair/Altair";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="App">
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        <GoogleAuthProvider>
          <div className="streaming-console">
            <SidePanel isOpen={isSidePanelOpen} onClose={() => setIsSidePanelOpen(false)} />
            <main>
              <header className="app-header">
                <button className="menu-toggle" onClick={toggleSidePanel}>
                  <Menu size={24} />
                </button>
                <h1>AI Assistant</h1>
              </header>

              <div className="main-app-area">
                <Altair />
                <video
                  className={videoRef.current && videoStream ? "stream" : "stream hidden"}
                  ref={videoRef}
                  autoPlay
                  playsInline
                />
              </div>

              <ControlTray
                videoRef={videoRef}
                supportsVideo={true}
                onVideoStreamChange={setVideoStream}
              >
                {/* Control buttons will be added here */}
              </ControlTray>
            </main>
          </div>
        </GoogleAuthProvider>
      </LiveAPIProvider>
    </div>
  );
};

export default App;
