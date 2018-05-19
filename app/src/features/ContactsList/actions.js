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

