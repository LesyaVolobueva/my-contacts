import React from 'react';
import PropTypes from 'prop-types';

const CustomField = ({
    type,
    label,
    input,
    meta: { touched, error },
}) => {
    return (
        <div className='contact__field'>
            <label
                className='contact__label'
                htmlFor={input.name}
            >{label}</label>
            <input
                className='contact__input'
                {...input}
                type={type}
                placeholder={label}
            />
            {touched && error &&
            <span className='inputError'>{error}</span>
            }
        </div>
    );
};

CustomField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.shape(Object),
};

export default CustomField;
