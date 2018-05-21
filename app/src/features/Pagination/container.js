import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    goToNextPage,
    goToPage,
    goToPrevPage,
    setMaxPages,
} from '../shared/actions';
import SmallPagination from './SmallPagination';

class PaginationContainer extends Component {
    render() {
        const { goToNextPage, goToPrevPage, currentPage, maxPages, goToPage } = this.props;
        const btnCount = new Array(maxPages).fill(' ');

        if (maxPages < 7) {
            return (
                <SmallPagination
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                    currentPage={currentPage}
                    maxPages={maxPages}
                    goToPage={goToPage}
                    btnCount={btnCount}
                />
            );
        }

        return (
            <div>...to be continued</div>
        );
    }
}

PaginationContainer.propTypes = {
    goToNextPage: PropTypes.func,
    goToPage: PropTypes.func,
    goToPrevPage: PropTypes.func,
    currentPage: PropTypes.number,
    maxPages: PropTypes.number,
};

export default connect(
    state => ({
        currentPage: state.contacts.currentPage,
        maxItems: state.contacts.maxItems,
        maxPages: state.contacts.maxPages,
    }),
    {
        goToNextPage,
        goToPage,
        goToPrevPage,
        setMaxPages,
    }
)(PaginationContainer);
