import * as types from './types';

export const filterByGroups = (payload) => ({
    type: types.FILTER_BY_GROUPS,
    payload,
});

export const filterByName = (payload) => ({
    type: types.FILTER_BY_NAME,
    payload,
});


