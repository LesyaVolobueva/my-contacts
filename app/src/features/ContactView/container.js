import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getCurrentContactThunk, getGroupsThunk, deleteContactThunk } from '../shared/actions';
import Contact from './component';
import Modal from '../../components/Modal';

class ContactContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };
    }

    componentDidMount() {
        const { groups, location: { pathname }, getGroupsThunk } = this.props;
        this.getContactFromUrl(pathname);

        if (!groups.length) {
            getGroupsThunk();
        }
    }

    getContactFromUrl = (pathname) => {
        const contactId = pathname.split('/')[2];

        if (Number(contactId)) {
            this.props.getCurrentContactThunk(contactId);
        }
    };

    hideModal = () => {
        this.setState({
            modalOpen: false,
        });
    };

    showModal = (id) => {
        this.setState({
            modalOpen: true,
            deleteId: id,
        });
    };

    back = () => {
        this.props.history.goBack();
    };

    getOnlyFilledField = (contact) => {
        const newContactView = {};

        Object.keys(contact).map(prop => {
            if (contact[prop]) {
                newContactView[prop] = contact[prop];
            }
            return prop;
        });

        return newContactView;
    };

    findGroupTitle = () => {
        const { groups, currentContact } = this.props;

        if (groups.length && currentContact && currentContact.groupId) {
            return this.props.groups.find(
                group => group.id === parseInt(currentContact.groupId, 10)
            ).title;
        }
        return '';
    };

    deleteContact = (id) => {
        this.props.deleteContactThunk(id);
        this.hideModal();
        this.props.history.push('/');
    };

    render() {
        const { currentContact } = this.props;
        const { modalOpen } = this.state;
        const id = currentContact ? currentContact.id : '';
        const contactView = currentContact
            ? this.getOnlyFilledField(currentContact)
            : null;
        const group = this.findGroupTitle();

        return (
            <div>
                <Modal
                    onCancel={this.hideModal}
                    open={modalOpen}
                    confirmTitle='Delete'
                    title='Are you sure to delete this contact?'
                    onConfirm={this.deleteContact.bind(null, id)}
                />
                <Contact
                    contact={contactView}
                    showModal={this.showModal}
                    goBack={this.back}
                    group={group}
                />
            </div>
        );
    }
}

ContactContainer.propTypes = {
    groups: PropTypes.arrayOf(Object),
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    currentContact: PropTypes.shape(Object),
    getCurrentContactThunk: PropTypes.func,
    getGroupsThunk: PropTypes.func,
    deleteContactThunk: PropTypes.func,
};

export default compose(
    withRouter,
    connect(
        state => ({
            groups: state.contacts.groups,
            currentContact: state.contacts.currentContact,
        }),
        {
            getCurrentContactThunk,
            getGroupsThunk,
            deleteContactThunk,
        }
    )
)(ContactContainer);
