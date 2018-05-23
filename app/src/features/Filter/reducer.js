import * as types from './types';

export const initialState = {
    filterByGroup: '',
    filterByName: '',
    filterIncoming: false,
    filterOutgoing: false,
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

        case types.FILTER_INCOMING:
            return {
                ...state,
                filterIncoming: !state.filterIncoming,
                filterOutgoing: false,
            };

        case types.FILTER_OUTGOING:
            return {
                ...state,
                filterOutgoing: !state.filterOutgoing,
                filterIncoming: false,
            };

            case types.RESET_FILTERS:
            return {
                ...state,
                filterOutgoing: false,
                filterIncoming: false,
            };

        default:
            return state;
    }
};