import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <i className='far fa-address-card' />
            <Link
                className='link'
                to='/'
            >
                My contacts
            </Link>
        </div>
    );
};

export default Header;
