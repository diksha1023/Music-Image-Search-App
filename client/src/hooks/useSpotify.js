import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to handle Spotify API interactions
export const useSpotify = (searchInput) => {
    const [accessToken, setAccessToken] = useState("");
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState("");

    // Fetch Spotify access token on component mount
    useEffect(() => {
        const authParameters = new URLSearchParams();
        authParameters.append('grant_type', 'client_credentials');
        authParameters.append('client_id', process.env.REACT_APP_CLIENT_ID);
        authParameters.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);

        axios.post("https://accounts.spotify.com/api/token", authParameters, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                setAccessToken(response.data.access_token);
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
                setError("Error fetching access token.");
            });
    }, []);

    // Play or pause audio
    const playAudio = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            setError("No audio URL available to play.");
        }
    };

    // Play track from URL
    const playTrack = (url) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(url);
        setAudio(newAudio);
        newAudio.play();
        setIsPlaying(true);
    };

    // Fetch Spotify track based on search input
    const fetchSpotifyTrack = async () => {
        if (!searchInput) return;

        await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=1`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(async (response) => {
                const artist = response.data.artists.items[0];
                if (artist && artist.name.toLowerCase() === searchInput.toLowerCase()) {
                    await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                        .then((response) => {
                            const track = response.data.tracks[0];
                            if (track && track.preview_url) {
                                playTrack(track.preview_url);
                            } else {
                                setError("No preview available for this track.");
                                fetchTrack();
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching top tracks:', error);
                            setError("An error occurred while fetching the top tracks.");
                            fetchTrack();
                        });
                } else {
                    fetchTrack();
                }
            })
            .catch(error => {
                console.error('Error fetching artist:', error);
                setError("An error occurred while fetching the artist.");
                fetchTrack();
            });
    };

    // Fetch track based on search input
    const fetchTrack = async () => {
        if (!searchInput) return;

        await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=1`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                const track = response.data.tracks.items[0];
                if (track && track.preview_url) {
                    playTrack(track.preview_url);
                } else {
                    setError("No preview available for this track.");
                    playRandomTrack();
                }
            })
            .catch(error => {
                console.error('Error fetching track:', error);
                setError("An error occurred while fetching the track.");
                playRandomTrack();
            });
    };

    // Play a random track
    const playRandomTrack = async () => {
        await axios.get(`https://api.spotify.com/v1/tracks?ids=3n3Ppam7vgaVa1iaRUc9Lp`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                const track = response.data.tracks[0];
                if (track && track.preview_url) {
                    playTrack(track.preview_url);
                } else {
                    setError("No preview available for the random track.");
                }
            })
            .catch(error => {
                console.error('Error fetching random track:', error);
                setError("An error occurred while fetching a random track.");
            });
    };

    // Handle search action
    const handleSearch = () => {
        setError("");
        if (audio) {
            audio.pause();
            setAudio(null);
            setIsPlaying(false);
        }
        fetchSpotifyTrack();
    };

    return { playAudio, handleSearch, isPlaying, error };
};
