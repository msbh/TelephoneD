export const getContactsFromDatabase = async () => {
    return [
        { id: '1', name: 'John Doe', phoneNumber: '1234567890' },
        { id: '2', name: 'Jane Smith', phoneNumber: '0987654321' },
    ];
};

export const uploadContactsToDatabase = async (contacts) => {
    console.log('Contacts uploaded:', contacts);
};

export const searchNumberInDatabase = async (phoneNumber) => {
    return [
        { id: '1', name: 'John Doe', tag: 'Friend' },
        { id: '2', name: 'Jane Smith', tag: 'Work' },
    ];
};