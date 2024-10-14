import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/HeaderSection/Header";
import Feed from "./components/FeedSection/Feed";
import SearchVideoResult from "./components/SearchSection/SearchVideoResult";
import VideoDetails from "./components/VideoSection/VideoDetails";
import { AppContext } from "./useContextHook/useContextApi";
import { ThemeProvider } from "./useContextHook/useTheme";
import ChannelDetails from "./channel/ChannelDetails";
import PlaylistDetails from "./channel/PlayListDetails";

function App() {
  return (
    <AppContext>
      <ThemeProvider>
        <BrowserRouter>
          <div className="flex flex-col w-full ">
            <Header />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route
                path="/search/:searchQuery"
                element={<SearchVideoResult />}
              />
              <Route
                path="/video/:categoryId/:videoId"
                element={<VideoDetails />}
              />
              <Route path="/channel/:channelId" element={<ChannelDetails />} />
              <Route
                path="/playlist/:playlistId"
                element={<PlaylistDetails />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext>
  );
}

export default App;
