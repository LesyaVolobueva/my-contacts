import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContactsThunk } from './actions';
import ContactsList from './component';

class ContactsListContainer extends Component {
    componentDidMount() {
        if (!this.props.contacts.length) {
            this.props.getContactsThunk();
        }
    }

    render() {
        const { contacts } = this.props;

        return (
            <div>
                <ContactsList
                    contacts={contacts}
                />
            </div>
        );
    }
}

ContactsListContainer.propTypes = {
    contacts: PropTypes.arrayOf(Object),
};

export default connect(
    state => ({
        contacts: state.contacts.contacts,
    }),
    {
        getContactsThunk,
    }
)(ContactsListContainer);
