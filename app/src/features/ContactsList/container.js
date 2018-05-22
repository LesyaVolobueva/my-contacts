import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import {
    getContactsThunk,
    getGroupsThunk,
    deleteContactThunk,
    setMaxPages,
    goToPage,
    getCurrentContact,
} from '../shared/actions';
import { getFilteredContacts } from '../shared/selectors';
import { Link } from 'react-router-dom';
import ContactsList from './component';
import Filter from '../Filter';
import Button from '../../components/Button';
import Pagination from '../Pagination';

class ContactsListContainer extends Component {
    state = {
        modalOpen: false,
    };

    componentDidMount() {
        const { getContactsThunk, groups, getGroupsThunk } = this.props;
        getContactsThunk();

        if (groups.length) {
            getGroupsThunk();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { filteredContacts, setMaxPages, goToPage, getCurrentContact } = this.props;

        if (filteredContacts.length !== nextProps.filteredContacts.length) {
            setMaxPages(nextProps.filteredContacts);
            goToPage(1);
        }

        if (nextProps.currentContact) {
            getCurrentContact(null);

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
        const { filteredContacts, groups, renderPagination, maxItems, currentPage } = this.props;
        const { modalOpen, deleteId } = this.state;
        const start = maxItems * (currentPage - 1);
        const end = maxItems * (currentPage);
        const contactsForPage = filteredContacts.slice(start, end);

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
                <Filter groups={groups}/>
                <ContactsList
                    contacts={contactsForPage}
                    groups={groups}
                    showModal={this.showModal}
                />
                {renderPagination && <Pagination/>}
            </div>
        );
    }
}

ContactsListContainer.propTypes = {
    filteredContacts: PropTypes.arrayOf(Object),
    groups: PropTypes.arrayOf(Object),
    renderPagination: PropTypes.bool,
    getGroupsThunk: PropTypes.func,
    getContactsThunk: PropTypes.func,
    deleteContactThunk: PropTypes.func,
    setMaxPages: PropTypes.func,
    maxItems: PropTypes.number,
    currentPage: PropTypes.number,
    goToPage: PropTypes.func,
};

export default connect(
    state => ({
        filteredContacts: getFilteredContacts(state),
        groups: state.contacts.groups,
        maxItems: state.contacts.maxItems,
        maxPages: state.contacts.maxPages,
        currentPage: state.contacts.currentPage,
        renderPagination: state.contacts.renderPagination,
        currentContact: state.contacts.currentContact,
    }),
    {
        getContactsThunk,
        getGroupsThunk,
        deleteContactThunk,
        setMaxPages,
        goToPage,
        getCurrentContact,
    }
)(ContactsListContainer);
