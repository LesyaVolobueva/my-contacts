import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import ContactEdit from './component';
import { updateContactThunk, getGroupsThunk, getCurrentContactThunk } from '../actions';
import { getContact } from '../selectors';

class ContactFormContainer extends Component {
    componentDidMount() {
        const { groups, location: { pathname }, getGroupsThunk } = this.props;
        this.getContactFromUrl(pathname);

        if (!groups.length) {
            getGroupsThunk();
        }
    };

    getContactFromUrl = (pathname) => {
        const contactId = pathname.split('/')[2];

        if (contactId) {
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

    updateContact = (contact) => {
        this.props.updateContactThunk({
            ...contact,
            groupId: +contact.groupId,
        });
    };

    back = () => {
        this.props.history.goBack()
    };

    render() {
        return (
            <ContactEdit
                {...this.props}
                required={this.required}
                email={this.email}
                normalizePhone={this.normalizePhone}
                updateContact={this.updateContact}
                back={this.back}
            />
        );
    }
}

ContactFormContainer.propTypes = {
    groups: PropTypes.arrayOf(Object),
    getGroupsThunk: PropTypes.func,
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
        }
    ),
    reduxForm({
        form: 'EditContact',
    })
)(ContactFormContainer);
