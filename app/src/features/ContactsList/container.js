import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import {
    getContactsThunk,
    getGroupsThunk,
    deleteContactThunk,
} from '../shared/actions';
import { getFilteredContacts } from '../shared/selectors';
import { Link } from 'react-router-dom';
import ContactsList from './component';
import Filter from '../Filter';
import Button from '../../components/Button';

class ContactsListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };
    }

    componentDidMount() {
        this.props.getContactsThunk();

        if (!this.props.groups.length) {
            this.props.getGroupsThunk();
        }
    }

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

    onConfirm = (id) => {
        this.props.deleteContactThunk(id)
            .then(() => this.hideModal());
    };

    render() {
        const { contacts, groups, deleteContactThunk } = this.props;
        const { modalOpen, deleteId } = this.state;

        return (
            <div>
                <div className='create-new'>
                    <Link to='/edit/new'>
                        <Button>Add contact</Button>
                    </Link>
                </div>
                <Modal
                    onCancel={this.hideModal}
                    open={modalOpen}
                    confirmTitle='Delete'
                    title='Are you sure to delete this contact?'
                    onConfirm={this.onConfirm.bind(null, deleteId)}
                />
                <Filter groups={groups} />
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
    deleteContactThunk: PropTypes.func,
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
