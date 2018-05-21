import * as types from './types';

export const initialState = {
    contacts: [],
    groups: [],
    currentContact: null,
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_CONTACTS :
            return {
                ...state,
                contacts: payload,
            };

        case types.GET_GROUPS :
            return {
                ...state,
                groups: payload,
            };

        case types.UPDATE_CONTACT :
            return {
                ...state,
                contacts: [
                    ...state.contacts.map(contact => contact.id === payload.id
                        ? payload
                        : contact
                    ),

                ],
            };

        case types.ADD_CONTACT :
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    payload,
                ],
            };

        case types.DELETE_CONTACT :
            return {
                ...state,
                contacts: [
                    ...state.contacts.filter(contact => contact.id !== payload.id),
                ],
            };

        case types.GET_CURRENT_CONTACT :
            return {
                ...state,
                currentContact: payload,
            };


        default:
            return state;
    }
};