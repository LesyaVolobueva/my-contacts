import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    onCLick,
    children,
    type,
}) => {
    return (
        <button
            type={type}
            onClick={onCLick}
            className='button'
        >{children}</button>
    );
};

Button.propTypes = {
    onCLick: PropTypes.func,
    children: PropTypes.any,
    type: PropTypes.string,
};

export default Button;
