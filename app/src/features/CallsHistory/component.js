import React from 'react';
import PropTypes from 'prop-types';

const CallsHistory = ({ calls, renderCallIcon, getDuration }) => {
    if (!calls.length) {
        return (
            <div className='calls'>
                <span className='no-items'>No calls </span>
            </div>
        );
    }
    return (
        <div className='calls'>
            {calls.map(call => (
                <div
                    key={call.id}
                    className='call'
                >
                    <div className='call__icon'>
                        <img
                            src={renderCallIcon(call.status)}
                            alt='callStatus'
                        />
                    </div>
                    <div className='call__info'>
                        <div className='call__number'>
                            {call.phone}
                        </div>
                        <div className='call__date-time'>
                            <span className='call__date'>{call.date}</span>
                            <span className='call__date'>{call.time}</span>
                        </div>
                    </div>
                    <div className='call__duration'>
                        {call.duration
                            ? getDuration(call.duration)
                            : call.status
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

CallsHistory.propTypes = {
    calls: PropTypes.arrayOf(Object),
    renderCallIcon: PropTypes.func,
    getDuration: PropTypes.func,
};

export default CallsHistory;
