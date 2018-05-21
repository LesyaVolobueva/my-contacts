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

    required = value => (value ? undefined : 'Required');

    number = value => (
        value && isNaN(Number(value))
            ? 'Must be a number'
            : undefined
    );

    email = value => (
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? 'Invalid email address'
            : undefined
    );

    normalizePhone = (value) => {
        if (!value) {
            return value;
        }

        const onlyNums = value.replace(/[^\d]/g, '');

        if (onlyNums.length <= 3) {
            return onlyNums;
        }
        if (onlyNums.length <= 7) {
            return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        }
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
    };

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
                required={this.required}
                email={this.email}
                normalizePhone={this.normalizePhone}
                updateContact={this.saveContact}
                back={this.back}
            />
        );
    }
}

ContactFormContainer.propTypes = {
    groups: PropTypes.arrayOf(Object),
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
