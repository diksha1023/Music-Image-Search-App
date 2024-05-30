import axios from 'axios';

// Fetch images from Unsplash API
export const fetchImages = async (searchInput, page) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
            page,
            query: searchInput,
            per_page: 20,
            client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID
        }
    });
    return response.data;
};

// Fetch random images from Unsplash API
export const fetchRandomImages = async () => {
    const response = await axios.get(`https://api.unsplash.com/photos/random`, {
        params: {
            count: 20,
            client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID
        }
    });
    return response.data;
};
