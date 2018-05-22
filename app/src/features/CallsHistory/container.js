import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getCallsThunk } from './actions';
import CallsHistory from './component';
import outgoing from '../../imgs/outgoing-call.png';
import incoming from '../../imgs/incoming.png';
import back from '../../imgs/back.png';
import Filter from '../Filter/CallsFilter';
import { getFilteredCalls } from './selectors';

class CallsHistoryContainer extends Component {
    componentDidMount() {
        const { getCallsThunk, location: { pathname } } = this.props;
        const id = pathname.split('/')[2];

        if (id) {
            getCallsThunk(id);
        }
    }

    renderCallIcon = (incom) => {
        if (incom) {
            return incoming;
        }
        return outgoing;
    };

    getDuration = (seconds) => {
        let hours = Math.floor(seconds / 360);
        let minutes = Math.floor((seconds % 360) / 60);
        let restSeconds = seconds - hours * 360 - minutes * 60;
        minutes = minutes > 0 ? `${minutes}m` : '';
        hours = hours > 0 ? `${hours}h` : '';
        restSeconds = restSeconds > 0 ? `${restSeconds}s` : '';

        return `${hours } ${minutes} ${restSeconds}`;
    };

    render() {
        return (
            <div className='relative'>
                <div
                    className='goBack'
                    onClick={this.props.history.goBack}
                >
                    <img
                        src={back}
                        alt='go back'
                    />
                </div>
                <Filter />
                <CallsHistory
                    calls={this.props.calls}
                    renderCallIcon={this.renderCallIcon}
                    getDuration={this.getDuration}
                />
            </div>
        );
    }
}

CallsHistoryContainer.propTypes = {
    getCallsThunk: PropTypes.func,
    calls: PropTypes.arrayOf(Object),
    history: PropTypes.shape({
        goBack: PropTypes.func,
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

export default compose(
    withRouter,
    connect(
        state => ({
            calls: getFilteredCalls(state),
        }),
        { getCallsThunk }
    )
)(CallsHistoryContainer);
