import * as types from './types';
import { getMaxPages } from './utils';

export const initialState = {
    contacts: [],
    groups: [],
    currentContact: null,
    currentPage: 1,
    maxItems: 3,
    maxPages: null,
    renderPagination: false,
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
                    ...state.contacts.filter(contact => contact.id !== payload),
                ],
            };

        case types.GET_CURRENT_CONTACT :
            return {
                ...state,
                currentContact: payload,
            };
        case types.NEXT_PAGE :
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };

        case types.PREV_PAGE :
            return {
                ...state,
                currentPage: state.currentPage - 1,
            };

        case types.SET_PAGE: {
            return {
                ...state,
                currentPage: payload,
            };
        }

        case types.SET_MAX_PAGES:
            return {
                ...state,
                maxPages: getMaxPages(state.maxItems, payload.length),
                renderPagination: payload.length > state.maxItems,
            };

        default:
            return state;
    }
};