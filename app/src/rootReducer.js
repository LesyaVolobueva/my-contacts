import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import contacts from './features/ContactsList/reducer';

export default combineReducers({
    contacts,
    form,
});