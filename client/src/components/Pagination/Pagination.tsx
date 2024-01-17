import React from 'react';
import PaginationBlock from './PaginationBlock';
import styles from './pagination.module.css';

const Pagination = ({ pages, selectedPage, setPage }) => {
    return (
        <div className={styles.pagination}>
            {pages.map((page) => (
                <PaginationBlock
                    key={page}
                    page={page}
                    selectedPage={selectedPage}
                    setPage={setPage}
                />
            ))}
        </div>
    );
};

export default Pagination;
