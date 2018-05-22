import * as types from './types';

export const getCalls = (payload) => ({
    type: types.GET_CALLS,
    payload,
});

export const getCallsThunk = (id) =>
    (dispatch, _, api) => (
        api(`callHistory?contactId=${id}`)
            .then((response) => dispatch(getCalls(response.data)))
    );