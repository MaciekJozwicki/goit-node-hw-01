const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

/**
 * Zwraca listę wszystkich kontaktów.
 * @returns {Promise<Array>} - Lista kontaktów.
 */
const listContacts = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

/**
 * Zwraca kontakt o podanym ID.
 * @param {string} contactId - ID kontaktu.
 * @returns {Promise<Object>} - Kontakt.
 */
const getContactById = (contactId) => {
  return listContacts().then(contacts => contacts.find(contact => contact.id === contactId));
}

/**
 * Usuwa kontakt o podanym ID.
 * @param {string} contactId - ID kontaktu.
 * @returns {Promise<void>}
 */
const removeContact = (contactId) => {
  return listContacts().then(contacts => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    return new Promise((resolve, reject) => {
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

/**
 * Dodaje nowy kontakt.
 * @param {string} name - Imię.
 * @param {string} email - Email.
 * @param {string} phone - Telefon.
 * @returns {Promise<void>}
 */
const addContact = (name, email, phone) => {
  return listContacts().then(contacts => {
    const newContact = { id: String(Date.now()), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    return new Promise((resolve, reject) => {
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
