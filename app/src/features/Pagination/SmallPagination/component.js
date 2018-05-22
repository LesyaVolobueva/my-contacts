import React from 'react';
import PropTypes from 'prop-types';

const SmallPagination = ({
    goToPrevPage,
    currentPage,
    btnCount,
    goToPage,
    goToNextPage,
    maxPages,
}) => {
    return (
        <div className='pagination'>
            <button
                className='pagi'
                onClick={goToPrevPage}
                disabled={currentPage === 1}
            >
                prev
            </button>
            {
                btnCount.map((count, index) => (
                    <button
                        key={index}
                        className={`pagi ${currentPage === index + 1 ? 'pagi--active' : ''}`}
                        onClick={goToPage.bind(null, index + 1)}
                    >
                        {index + 1}
                    </button>
                ))
            }
            <button
                className='pagi'
                onClick={goToNextPage}
                disabled={currentPage === maxPages}
            >
                next
            </button>
        </div>
    );
};

SmallPagination.propTypes = {
    goToPrevPage: PropTypes.func,
    currentPage: PropTypes.number,
    btnCount: PropTypes.arrayOf(PropTypes.string),
    goToPage: PropTypes.func,
    goToNextPage: PropTypes.func,
    maxPages: PropTypes.number,
};

export default SmallPagination;
