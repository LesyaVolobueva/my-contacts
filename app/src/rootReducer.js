import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import contacts from './features/reducer';
import filter from './features/Filter/reducer';

export default combineReducers({
    filter,
    contacts,
    form,
});