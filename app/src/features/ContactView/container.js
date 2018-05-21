import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getCurrentContactThunk, getGroupsThunk, deleteContactThunk } from '../shared/actions';
import Contact from './component'
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


    render() {
        const { currentContact } = this.props;
        const { modalOpen } = this.state;
        const id = currentContact ? currentContact.id : '';

        return (
            <div>
                <Modal
                    onCancel={this.hideModal}
                    open={modalOpen}
                    confirmTitle='Delete'
                    title='Are you sure to delete this contact?'
                    onConfirm={deleteContactThunk.bind(null, id)}
                />
                <Contact
                    contact={currentContact}
                    showModal={this.showModal}
                />
            </div>
        );
    }
}

ContactContainer.propTypes = {
    groups: PropTypes.arrayOf(Object),
    pathname: PropTypes.string,
    currentContact: PropTypes.shape(Object),
    getCurrentContactThunk: PropTypes.func,
    getGroupsThunk: PropTypes.func,
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
