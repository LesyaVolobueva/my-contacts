import React from 'react';
import PropTypes from 'prop-types';
import Contact from './ContactsItem';

const ContactsList = ({
    contacts,
    groups,
    showModal,
}) => {
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

ContactsList.propTypes = {};

export default ContactsList;
