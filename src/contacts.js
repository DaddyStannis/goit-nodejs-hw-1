const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
}

async function listContacts() {
  try {
    const buffer = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(buffer);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [removed] = contacts.splice(index, 1);
  updateContacts(contacts);
  return removed;
}

async function addContact(name, email, phone) {
  const contact = {
    id: uniqid(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(contact);
  updateContacts(contacts);
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
