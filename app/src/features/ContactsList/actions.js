import * as types from './types';

export const getContacts = (payload) => ({
    type: types.GET_CONTACTS,
    payload,
});

export const getContactsThunk = () => (
    (dispatch, _, api) => (
        api('contacts')
            .then((response) => dispatch(getContacts(response.data)))
    )
);

export const getGroups = (payload) => ({
    type: types.GET_GROUPS,
    payload,
});

export const getGroupsThunk = () => (
    (dispatch, _, api) => (
        api('groups')
            .then((response) => dispatch(getGroups(response.data)))
    )
);

export const updateContact = (payload) => ({
    type: types.UPDATE_CONTACT,
    payload,
});


export const updateContactThunk = (contact) => (
    (dispatch, _, api) => (
        api(`contacts/${contact.id}`, 'put', contact)
            .then((response) => dispatch(updateContact(response.data)))
    )
);

export const deleteContact = (payload) => ({
    type: types.DELETE_CONTACT,
    payload,
});


export const deleteContactThunk = (id) => (
    (dispatch, _, api) => (
        api(`contacts/${id}`, 'delete')
            .then((response) => dispatch(deleteContact(response.data)))
    )
);

