const fs = require("fs").promises;
const path = require("path");

/*
 * Skomentuj i zapisz wartość
 * const contactsPath = ;
 */
const contactsPath = path.join(__dirname, "./db/contacts.js");

// TODO: udokumentuj każdą funkcję
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    console.table(parsedData);
    return parsedData;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(contacts);

    const contact = parsedData.filter(contact => contact.id === contactId);
    console.log(contact);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(contacts);

    const contact = parsedData.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contact), error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(contacts);

    parsedData.push({
      id: parsedData.length + 1,
      name: name,
      email: email,
      phone: phone,
    });

    fs.writeFile(contactsPath, JSON.stringify(parsedData), error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
