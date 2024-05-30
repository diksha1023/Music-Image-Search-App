import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Pagination from './components/Pagination';
import { useSpotify } from './hooks/useSpotify';
import { useUnsplash } from './hooks/useUnsplash';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const { playAudio, handleSearch, isPlaying, error: spotifyError } = useSpotify(searchInput);
  const { imgs, totalPages, error: unsplashError } = useUnsplash(searchInput, page);

  const handleSearchClick = () => {
    handleSearch();
    setPage(1);
  };

  return (
    <div className="App">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearchClick}
        handleKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        isPlaying={isPlaying}
        playAudio={playAudio}
      />
      {spotifyError && <Alert variant="danger">{spotifyError}</Alert>}
      {unsplashError && <Alert variant="danger">{unsplashError}</Alert>}
      <ImageGallery imgs={imgs} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}


export default App;



