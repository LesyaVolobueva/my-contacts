export const getContact = (state, ownProps) => {
    if (ownProps.match.params.id === 'new') {
        return {
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
        };
    }
    return state.contacts.currentContact;
};

export const getFilteredContacts = (state) => {
    const { contacts } = state.contacts;
    const { filterByGroup, filterByName } = state.filter;

    let filteredContacts = filterByGroup
        ? [...contacts].filter(contact => (
            parseInt(contact.groupId, 10) === parseInt(filterByGroup, 10))
        )
        : contacts;

    filteredContacts = filterByName
        ? [...filteredContacts].filter(contact => (
            contact.name.toLocaleLowerCase().includes(filterByName.toLocaleLowerCase()))
        )
        : filteredContacts;

    return filteredContacts;
};
