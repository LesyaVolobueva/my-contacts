import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getCallsThunk } from './actions';


class CallsHistory extends Component {
    componentDidMount() {
        const { getCallsThunk, location: { pathname } } = this.props;
        const id = pathname.split('/')[2];

        if (id) {
            getCallsThunk(id);
        }
    }

    render() {
        return (
            <div>
                <h3>CallsHistory</h3>
            </div>
        );
    }
}

CallsHistory.propTypes = {
    calls: PropTypes.arrayOf({
        id: PropTypes.number,
        contactId: PropTypes.number,
        phone: PropTypes.string,
        status: PropTypes.string,
        date: PropTypes.string,
        duration: PropTypes.number,
        time: PropTypes.string,
    }),
};

export default compose(
    withRouter,
    connect(
        state => ({
            calls: state.calls.calls,
        }),
        { getCallsThunk }
    )
)(CallsHistory);
