import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/HeaderSection/Header";
import Feed from "./components/FeedSection/Feed";
import SearchVideoResult from "./components/SearchSection/SearchVideoResult";
import VideoDetails from "./components/VideoSection/VideoDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full ">
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/search/:searchQuery" element={<SearchVideoResult />} />
          <Route
            path="/video/:categoryId/:videoId"
            element={<VideoDetails />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
