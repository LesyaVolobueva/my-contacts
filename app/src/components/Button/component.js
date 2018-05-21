import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    onClick,
    children,
    type,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className='button'
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
    type: PropTypes.string,
};

export default Button;
