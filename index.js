const { Command } = require("commander");
const services = require("./src/contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      var result = await services.listContacts();
      return console.log(result);

    case "get":
      var result = await services.getContactById(id);
      return console.log(result);

    case "add":
      var result = await services.addContact(name, email, phone);
      return console.log(result);

    case "remove":
      var result = await services.removeContact(id);
      return console.log(result);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
