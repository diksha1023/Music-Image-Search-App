import React from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaPlay, FaPause } from 'react-icons/fa';

// SearchBar component handles the search input, search button, and play/pause button
const SearchBar = ({ searchInput, setSearchInput, handleSearch, handleKeyDown, isPlaying, playAudio }) => {
    return (
        <Container className="search-bar-container container-custom">
            <InputGroup size="lg">
                <FormControl
                    placeholder='Search Music'
                    type='input'
                    className="search-bar-input"
                    onKeyDown={handleKeyDown}
                    onChange={e => setSearchInput(e.target.value)}
                />
                <Button className="search-bar-button" onClick={handleSearch}>
                    Search
                </Button>
                <Button className="toggle-audio-button" variant="primary" onClick={playAudio} style={{ marginLeft: '10px' }}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
            </InputGroup>
        </Container>
    );
};

export default SearchBar;
