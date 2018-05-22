import * as types from './types';

export const initialState = {
    calls: [],
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_CALLS:
            return {
                ...state,
                calls: [...payload],
            };
            
        default:
            return state;
    }
}