import React from 'react';
import styles from './pagination.module.css';

const PaginationBlock = ({ page, selectedPage, setPage }) => {
    return (
        <div
            className={selectedPage === page ? styles.blockSelected : styles.block}
            onClick={() => setPage(page)}>
            {page}
        </div>
    );
};

export default PaginationBlock;
