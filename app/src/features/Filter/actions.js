import * as types from './types';

export const filterByGroups = (payload) => ({
    type: types.FILTER_BY_GROUPS,
    payload,
});

export const filterByName = (payload) => ({
    type: types.FILTER_BY_NAME,
    payload,
});

export const changeFilterByIncoming = () => ({
    type: types.FILTER_INCOMING,
});

export const changeFilterByOutgoing = () => ({
    type: types.FILTER_OUTGOING,
});

export const resetFilters = () => ({
    type: types.RESET_FILTERS,
});


