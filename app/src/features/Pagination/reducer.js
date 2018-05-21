import * as types from './types';

export const initialState = {
    currentPage: 1,
    maxItems: 4,
    maxPages: null,
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
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
                maxPages: payload,
            };

        default:
            return state;
    }
}