import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import ContactEdit from './component';

import {
    updateContactThunk,
    getGroupsThunk,
    getCurrentContactThunk,
    addContactThunk,
} from '../shared/actions';
import { getContact } from '../shared/selectors';

const phoneRegex = /^((\+38)?(\(?0\d{2}\)?)?( |-)?(\d{3})( |-)?(\d{2}( |-)?\d{2}))$/;

class ContactFormContainer extends Component {
    componentDidMount() {
        const { groups, location: { pathname }, getGroupsThunk } = this.props;
        this.getContactFromUrl(pathname);

        if (!groups.length) {
            getGroupsThunk();
        }
    }

    getContactFromUrl = (pathname) => {
        const contactId = pathname.split('/')[2];

        if (parseInt(contactId, 10)) {
            this.props.getCurrentContactThunk(contactId);
        }
    };

    isRequired = value => (value ? undefined : 'Required');

    isPhoneNumber = value => (
        value && !phoneRegex.test(value)
            ? 'Invalid phone'
            : undefined
    );

    isEmail = value => (
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? 'Invalid email address'
            : undefined
    );

    saveContact = (contact) => {
        if (!contact.id) {
            this.props.addContactThunk(contact)
                .then((newContact) => {
                    this.props.history.push(`/contacts/${newContact.id}`);
                });
        } else {
            this.props.updateContactThunk({
                ...contact,
                groupId: parseInt(contact.groupId, 10),
            }).then((newContact) => {
                this.props.history.push(`/contacts/${newContact.id}`);
            });
        }
    };

    back = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <ContactEdit
                {...this.props}
                required={this.isRequired}
                email={this.isEmail}
                phone={this.isPhoneNumber}
                updateContact={this.saveContact}
                back={this.back}
            />
        );
    }
}

ContactFormContainer.propTypes = {
    groups: PropTypes.arrayOf(Object),
    contacts: PropTypes.arrayOf(Object),
    getGroupsThunk: PropTypes.func,
    getCurrentContactThunk: PropTypes.func,
    updateContactThunk: PropTypes.func,
    addContactThunk: PropTypes.func,
    history: PropTypes.shape({
        goBack: PropTypes.func,
        push: PropTypes.func,
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

export default compose(
    withRouter,
    connect(
        (state, ownProps) => ({
            initialValues: getContact(state, ownProps),
            groups: state.contacts.groups,
        }),
        {
            updateContactThunk,
            getGroupsThunk,
            getCurrentContactThunk,
            addContactThunk,
        }
    ),
    reduxForm({
        form: 'EditContact',
    })
)(ContactFormContainer);
