import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateContactThunk } from '../../shared/actions';
import Contact from './component';

class ContactItemContainer extends Component {
    changeFavourites = (contact) => {
        this.props.updateContactThunk({
            ...contact,
            favourites: !contact.favourites,
        })
    };

    render() {
        const { contact, group, showModal } = this.props;

        return (
                <Contact
                    contact={contact}
                    group={group}
                    changeFavourites={this.changeFavourites}
                    deleteContact={showModal}
                />
        );
    }
}

ContactItemContainer.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        photoUrl: PropTypes.string,
        birthday: PropTypes.string,
        mobPhone: PropTypes.string,
        workPhone: PropTypes.string,
        email: PropTypes.string,
        description: PropTypes.string,
        favourites: PropTypes.bool,
    }),
};

export default connect(
    null,
    {
        updateContactThunk,
    }
)(ContactItemContainer);
