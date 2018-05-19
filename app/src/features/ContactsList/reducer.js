import * as types from './types';

export const initialState = {
    contacts: [],
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_CONTACTS :
            return {
                ...state,
                contacts: payload,
            };

        default:
            return state;
    }
};