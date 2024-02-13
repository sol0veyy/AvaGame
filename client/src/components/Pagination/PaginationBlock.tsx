import React from 'react';
import './pagination.css';

const PaginationBlock = ({ page, selectedPage, setPage }) => {
    return (
        <div
            // className={selectedPage === page ? styles.blockSelected : styles.block}
            className={`block ${selectedPage === page ? 'blockSelected' : ''}`}
            onClick={() => setPage(page)}>
            {page}
        </div>
    );
};

export default PaginationBlock;
