import { useState, useEffect, useCallback } from 'react';
import { fetchImages, fetchRandomImages } from '../utils/unsplash';

// Custom hook to handle Unsplash API interactions
const CACHE = {};

export const useUnsplash = (searchInput, page) => {
    const [imgs, setImgs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");

    // Function to fetch images
    const getImages = useCallback(async () => {
        if (!searchInput) return;

        const cacheKey = `${searchInput}-${page}`;
        if (CACHE[cacheKey]) {
            const cachedData = CACHE[cacheKey];
            setImgs(cachedData.results);
            setTotalPages(cachedData.total_pages);
            return;
        }

        try {
            const { results, total_pages } = await fetchImages(searchInput, page);
            if (results.length === 0) {
                const randomImages = await fetchRandomImages();
                setImgs(randomImages);
                setTotalPages(1);
            } else {
                setImgs(results);
                setTotalPages(total_pages);
                CACHE[cacheKey] = { results, total_pages };
            }
        } catch (err) {
            console.error('Error fetching images:', err);
            setError("An error occurred while fetching images.");
        }
    }, [searchInput, page]);

    // Fetch images on search input or page change
    useEffect(() => {
        getImages();
    }, [searchInput, page, getImages]);

    return { imgs, totalPages, error };
};
