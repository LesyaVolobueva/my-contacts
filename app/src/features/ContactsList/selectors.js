export const findContact = (state, ownProps) => (
    state.contacts.contacts.find(contact => contact.id === +ownProps.match.params.id)
);
