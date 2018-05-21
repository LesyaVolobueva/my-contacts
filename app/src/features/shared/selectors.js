export const getContact = (state) => (
    state.contacts.currentContact || {
        id: null,
        photoUrl: 'https://www.teksteshqip.com/img_upz/allart_full/63351.jpg',
        name: '',
        birthday: '',
        mobPhone: '',
        workPhone: '',
        email: '',
        groupId: '',
        favourites: false,
        description: '',
    }
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
