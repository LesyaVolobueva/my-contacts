import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import {
    getContactsThunk,
    getGroupsThunk,
    deleteContactThunk,
} from '../actions';
import { getFilteredContacts } from '../selectors';
import ContactsList from './component';
import Filter from '../Filter';

class ContactsListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };
    }

    componentDidMount() {
        if (!this.props.contacts.length) {
            this.props.getContactsThunk();
        }
        if (!this.props.groups.length) {
            this.props.getGroupsThunk();
        }
    }

    hideModal = () => {
        this.setState({
            modalOpen: false,
        })
    };

    showModal = (id) => {
        this.setState({
            modalOpen: true,
            deleteId: id,
        })
    };

    render() {
        const { contacts, groups, deleteContactThunk } = this.props;
        const { modalOpen, deleteId } = this.state;

        return (
            <div>
                <Modal
                    onCancel={this.hideModal}
                    open={modalOpen}
                    confirmTitle='Delete'
                    title='Are you sure to delete this contact?'
                    onConfirm={deleteContactThunk.bind(null, deleteId)}
                />
                <Filter groups={groups}/>
                <ContactsList
                    contacts={contacts}
                    groups={groups}
                    showModal={this.showModal}
                />
            </div>
        );
    }
}

ContactsListContainer.propTypes = {
    contacts: PropTypes.arrayOf(Object),
    groups: PropTypes.arrayOf(Object),
    getGroupsThunk: PropTypes.func,
    getContactsThunk: PropTypes.func,
};

export default connect(
    state => ({
        contacts: getFilteredContacts(state),
        groups: state.contacts.groups,
    }),
    {
        getContactsThunk,
        getGroupsThunk,
        deleteContactThunk,
    }
)(ContactsListContainer);
