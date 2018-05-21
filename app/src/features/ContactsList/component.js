import React from 'react';
import PropTypes from 'prop-types';
import Contact from './ContactsItem';

const ContactsList = ({
    contacts,
    groups,
    showModal,
}) => {
    if (!contacts.length) {
        return (
            <div className="contact-list" >
                <span className='contact-list__no-items'>No contacts :(</span>
            </div>
        );
    }

    return (
        <div className="contact-list" >
            {contacts.map(item => (
                <Contact
                    key={item.id}
                    contact={item}
                    group={groups.find(group => group.id === item.groupId)}
                    showModal={showModal}
                />
                )
            )}
        </div>
    );
};

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(Object),
    groups: PropTypes.arrayOf(Object),
    showModal: PropTypes.func,
};

export default ContactsList;
