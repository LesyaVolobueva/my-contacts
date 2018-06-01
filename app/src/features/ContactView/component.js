import React from 'react';
import PropTypes from 'prop-types';
import edit from '../../imgs/edit.png';
import { Link } from 'react-router-dom';
import history from '../../imgs/history.png';
import deleteImg from '../../imgs/delete.png';
import back from '../../imgs/back.png';

const Contact = ({ contact, showModal, goBack, group }) => {
    if (!contact) {
        return null;
    }

    return (
        <div className='form'>
            <div
                onClick={goBack}
                className='goBack'
            >
                <img src={back} alt="go back"/>
            </div>
            {contact && <div className='contact__field'>
                <img
                    src={contact.photoUrl}
                    alt='avatar'
                    className='avatar'
                />
            </div>}
            <div className='contact__field'>
                <div className='contact__name contact__name--render'>
                    {contact.name}
                </div>
            </div>
            {group &&
            <div className='contact__field'>
                <div className='contact__group contact__group--render'>
                    {group}
                </div>
            </div>
            }
            {contact.description &&
            <div className='contact__row'>
                <div className='contact__value contact__value--full'>
                    {contact.description}
                </div>
            </div>
            }
            <div className='contact__row'>
                <div className='icons'>
                    <div className='contact__icon contact__icon--render'>
                        <Link to={`/calls/${contact.id}`}>
                            <img
                                className='img'
                                src={history}
                                alt='history'
                            />
                        </Link>
                    </div>
                    <div className='contact__icon contact__icon--render'>
                        <Link to={`/edit/${contact.id}`}>
                            <img
                                className='img'
                                src={edit}
                                alt='edit'
                            />
                        </Link>
                    </div>
                    <div
                        className='contact__icon contact__icon--render'
                        onClick={showModal}
                    >
                        <img
                            className='img'
                            src={deleteImg}
                            alt='delete'
                        />
                    </div>
                </div>
            </div>
            <div className='contact__row'>
                <div className='contact__label'>Mobile:</div>
                <div className='contact__value'>{contact.mobPhone}</div>
            </div>
            {contact.workPhone &&
            <div className='contact__row'>
                <div className='contact__label'>Work phone:</div>
                <div className='contact__value'>{contact.workPhone}</div>
            </div>
            }
            {contact.birthday &&
            <div className='contact__row'>
                <div className='contact__label'>Birthday:</div>
                <div className='contact__value'>{contact.birthday}</div>
            </div>
            }
            {contact.email &&
            <div className='contact__row'>
                <div className='contact__label'>Email:</div>
                <div className='contact__value'>{contact.email}</div>
            </div>
            }

        </div>

    );
};

Contact.propTypes = {
    contact: PropTypes.object,
    showModal: PropTypes.func,
};

export default Contact;
