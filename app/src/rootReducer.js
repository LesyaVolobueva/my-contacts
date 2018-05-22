import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import contacts from './features/shared/reducer';
import filter from './features/Filter/reducer';
import calls from './features/CallsHistory/reducer';

export default combineReducers({
    filter,
    contacts,
    calls,
    form,
});