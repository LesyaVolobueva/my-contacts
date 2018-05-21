export const getContact = (state) => (
    state.contacts.currentContact
);

export const getFilteredContacts = (state) => {
    const { contacts } = state.contacts;
    const { filterByGroup, filterByName } = state.filter;

    let filteredContacts = filterByGroup
        ? [...contacts].filter(contact => (+contact.groupId === +filterByGroup))
        : contacts;

    filteredContacts = filterByName
        ? [...filteredContacts].filter(contact => (
            contact.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()))
        )
        : filteredContacts;

    return filteredContacts;
};
