import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import edit from '../../../imgs/edit.png';
import history from '../../../imgs/history.png';
import deleteImg from '../../../imgs/delete.png';

const ContactItem = ({ changeFavourites, contact, group, deleteContact }) => {
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
                    <div className='labels'>
                        {contact.groupId && group &&
                        <div className='contact__group'>{group.title}</div>
                        }
                        <div
                            className={`contact__fav ${contact.favourites && 'active'}`}
                            onClick={changeFavourites.bind(null, contact)}
                        >
                            Favourites
                        </div>
                    </div>
                </div>
                <div className='contact__phone'>
                    {contact.mobPhone}
                </div>
                <div className='contact__description'>
                    {contact.description}
                </div>
                <div className="contact__footer">
                    <div className="contact__icon">
                        <Link to={`/calls/${contact.id}`}>
                            <img
                                className='img'
                                src={history}
                                alt="history"
                            />
                        </Link>
                    </div>
                    <div className="contact__icon">
                        <Link to={`/edit/${contact.id}`}>
                            <img
                                className='img'
                                src={edit}
                                alt="edit"
                            />
                        </Link>
                    </div>
                    <div
                        className="contact__icon"
                        onClick={deleteContact.bind(null, contact.id)}
                    >
                        <img
                            className='img'
                            src={deleteImg}
                            alt="delete"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactItem.propTypes = {
    changeFavourites: PropTypes.func,
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

export default ContactItem;
