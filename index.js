const { Command } = require('commander');
const contacts = require('./contacts');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      contacts.listContacts().then(console.table);
      break;

    case 'get':
      contacts.getContactById(id).then(console.log);
      break;

    case 'add':
      contacts.addContact(name, email, phone).then(() => console.log('Kontakt dodany'));
      break;

    case 'remove':
      contacts.removeContact(id).then(() => console.log('Kontakt usunięty'));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
