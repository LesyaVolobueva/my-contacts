import React from 'react';
import PropTypes from 'prop-types';

const CustomField = ({
    type,
    label,
    input,
    meta: { touched, error },
    placeholder,
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
                placeholder={placeholder}
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
    input: PropTypes.object,
    placeholder: PropTypes.string,
};

export default CustomField;
