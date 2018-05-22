import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilterByIncoming, changeFilterByOutgoing } from '../actions';

class FilterContainer extends Component {
    render() {
        const {
            filterOutgoing,
            filterIncoming,
            changeFilterByIncoming,
            changeFilterByOutgoing,
        } = this.props;

        return (
            <div className='filter filter--calls'>
                <div
                    className={`filter__tab
                        ${ filterIncoming && !filterOutgoing && 'filter__tab--active'}
                    `}
                    onClick={changeFilterByIncoming}
                >
                    Incoming
                </div>
                <div
                    className={`filter__tab
                     ${filterOutgoing && !filterIncoming && 'filter__tab--active'}
                     `}
                    onClick={changeFilterByOutgoing}
                >
                    Outgoing
                </div>
            </div>
        );
    }
}

FilterContainer.propTypes = {
    changeFilterByIncoming: PropTypes.func,
    changeFilterByOutgoing: PropTypes.func,
    filterOutgoing: PropTypes.bool,
    filterIncoming: PropTypes.bool,
};

export default connect(
    state => ({
        filterOutgoing: state.filter.filterOutgoing,
        filterIncoming: state.filter.filterIncoming,
    }),
    { changeFilterByIncoming, changeFilterByOutgoing }
)(FilterContainer);
