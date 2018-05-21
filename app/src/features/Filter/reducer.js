import * as types from './types';

export const initialState = {
    filterByGroup: '',
    filterByName: '',
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FILTER_BY_NAME:
            return {
                ...state,
                filterByName: payload,
            };

        case types.FILTER_BY_GROUPS:
            return {
                ...state,
                filterByGroup: payload,
            };

        default:
            return state;
    }
};