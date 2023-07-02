const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
 
async function listContacts() {
        const date = await fs.readFile(contactsPath);
    return JSON.parse(date);
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const oneContact = contacts.find(contact=> contact.id === contactId)
    return oneContact || null;
};

async function addContact(data) {
        const contacts = await listContacts();
    const addContact = { id: nanoid(), ...data };
    contacts.push(addContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return addContact;
  };

async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexDelete = contacts.findIndex(
    (contact) => contact.id === contactId
    );
    if (indexDelete === -1) {
        return null
    }
    const [deleteContact] = contacts.splice(indexDelete, 1);
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
 return deleteContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}