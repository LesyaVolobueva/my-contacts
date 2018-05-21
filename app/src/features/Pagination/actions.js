import * as types from './types';

export const goToNextPage = () => ({
    type: types.NEXT_PAGE,
});

export const goToPrevPage = () => ({
    type: types.PREV_PAGE,
});

export const goToPage = (payload) => ({
    type: types.SET_PAGE,
    payload,
});

export const setMaxPages = (payload) => ({
    type: types.SET_MAX_PAGES,
    payload,
});