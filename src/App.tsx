import React, { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { GoogleAuthProvider } from "./contexts/GoogleAuthContext";
import SidePanel from "./components/side-panel/SidePanel";
import { Calendar } from "./components/calendar/Calendar";
import { EmailDraft } from "./components/email-draft/EmailDraft";
import ControlTray from "./components/control-tray/ControlTray";
import { YouTubeSuggestions } from "./components/youtube/youtube";
import cn from "classnames";
import { GoogleSignInButton } from "./components/auth/GoogleSignInButton";
import { Menu } from 'lucide-react';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [activeView, setActiveView] = useState<'calendar' | 'email' | 'youtube'>('calendar');
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
                <div className="google-sign-in">
                  <GoogleSignInButton />
                </div>
              </header>
              <div className="view-toggle">
                <button
                  onClick={() => setActiveView('calendar')}
                  className={cn({ active: activeView === 'calendar' })}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setActiveView('email')}
                  className={cn({ active: activeView === 'email' })}
                >
                  Email
                </button>
                <button
                  onClick={() => setActiveView('youtube')}
                  className={cn({ active: activeView === 'youtube' })}
                >
                  YouTube
                </button>
              </div>

              <div className="main-app-area">
                {activeView === 'calendar' ? <Calendar /> : 
                activeView === 'email' ? <EmailDraft /> : 
                <YouTubeSuggestions />}
                <video
                  className={cn("stream", {
                    hidden: !videoRef.current || !videoStream,
                  })}
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

<<<<<<< HEAD
export default App;

=======
// Basic inline styles for the app
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    margin: '0',
  },
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
  },
  main: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#21a1f1',
  },
  footer: {
    marginTop: '40px',
    fontSize: '14px',
    color: '#888',
  },
};

export default App;
>>>>>>> 40f04af74c7dd996017be5c73f6b02495a21fd08
