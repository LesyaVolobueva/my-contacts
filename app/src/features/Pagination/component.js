import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
    goToPrevPage,
    currentPage,
    goToPage,
    goToNextPage,
    maxPages,
}) => {
    return (
        <div className='pagination'>
            <button
                className='pagi'
                onClick={goToPage.bind(null, 1)}
                disabled={currentPage === 1}
            >
                1st
            </button>
            <button
                className='pagi'
                onClick={goToPrevPage}
                disabled={currentPage === 1}
            >
                prev
            </button>
            {currentPage !== 1 &&
                <button
                    className='pagi'
                    onClick={goToPage.bind(null, currentPage - 1)}
                >
                    {currentPage - 1}
                </button>
            }
            <button
                className='pagi pagi--active'
                onClick={goToPage.bind(null, currentPage)}
            >
                {currentPage}
            </button>
            {currentPage !== maxPages &&
            <button
                className='pagi'
                onClick={goToPage.bind(null, currentPage + 1)}
            >
                {currentPage + 1}
            </button>
            }
            <button
                className='pagi'
                onClick={goToNextPage}
                disabled={currentPage === maxPages}
            >
                next
            </button>
            <button
                className='pagi'
                onClick={goToPage.bind(null, maxPages)}
                disabled={currentPage === maxPages}
            >
                last
            </button>
        </div>
    );
};

Pagination.propTypes = {
    goToPrevPage: PropTypes.func,
    currentPage: PropTypes.number,
    btnCount: PropTypes.arrayOf(PropTypes.string),
    goToPage: PropTypes.func,
    goToNextPage: PropTypes.func,
    maxPages: PropTypes.number,
};

export default Pagination;
