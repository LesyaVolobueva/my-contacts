import React from 'react';
import PropTypes from 'prop-types';
import edit from '../../imgs/edit.png';
import { Link } from 'react-router-dom';
import history from '../../imgs/history.png';
import deleteImg from '../../imgs/delete.png';

const Contact = ({ contact, showModal }) => {
    if (!contact) {
        return null;
    }

    return (
        <div className='form'>
            {contact && <div className='contact__field'>
                <img
                    src={contact.photoUrl}
                    alt='avatar'
                    className='avatar'
                />
            </div>}
            <div className='contact__field'>
                <div className='contact__name contact__name--render'>{contact.name}</div>
            </div>
            <div className='contact__field'>
                <div className="icons">
                    <div className="contact__icon contact__icon--render">
                        <Link to={`/calls/${contact.id}`}>
                            <img className='img'  src={history} alt="history"/>
                        </Link>
                    </div>
                    <div className="contact__icon contact__icon--render">
                        <Link to={`/edit/${contact.id}`}>
                            <img className='img'  src={edit} alt="edit"/>
                        </Link>
                    </div>
                    <div
                        className="contact__icon contact__icon--render"
                        onClick={showModal}
                    >
                        <img className='img'  src={deleteImg} alt="delete"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

Contact.propTypes = {
    contact: PropTypes.shape(Object),
    showModal: PropTypes.func,
};

export default Contact;
