import React from 'react';
import { Button } from 'react-bootstrap';

// Pagination component to navigate through the pages of images
const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="pagination-buttons">
            {page > 1 && <Button className="mx-2" variant="primary" onClick={() => setPage(page - 1)}>Previous</Button>}
            {page < totalPages && <Button className="mx-2" variant="primary" onClick={() => setPage(page + 1)}>Next</Button>}
        </div>
    );
};

export default Pagination;
