import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ContactItemContainer extends Component {
    render() {
        const {contact} = this.props;
        return (
            <div className='contact'>
                <div className='contact__photo'>
                    <img
                        className='photo'
                        src={contact.photoUrl}
                        alt='avatar'
                    />
                </div>
                <div className='contact__info'>
                    <div className='contact__header'>
                        <div>
                            <Link
                                className='contact__name'
                                to={`/contacts/${contact.id}`}
                            >
                                {contact.name}
                            </Link>
                        </div>
                        {contact.favourites &&
                        <div className='contact__fav'>
                            Favourites
                            <i className='far far-star'/>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ContactItemContainer.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        photoUrl: PropTypes.string,
        birthday: PropTypes.string,
        mobPhone: PropTypes.string,
        workPhone: PropTypes.string,
        email: PropTypes.string,
        description: PropTypes.string,
        favourites: PropTypes.bool,
    }),
};

export default ContactItemContainer;
