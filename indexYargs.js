const foo = require('./contacts'); 

const argv = require("yargs").argv;


const invokeAction = async({ action, id, name, email, phone }) =>{
  switch (action) {
    case 'list':
          const contacts =  await foo.listContacts();
         return console.table(contacts);
  
      case 'get':
          const contactId = await foo.getContactById(id);
          return console.log(contactId);
    
      case 'add':
          const addContact = await foo.addContact({name, email, phone});
         return console.log(addContact);

    case 'remove':
          const deleteContact = await foo.removeContact(id);
          return console.log(deleteContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);


// # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

// # Отримуємо контакт по id і виводимо у консоль об'єкт контакту або null, якщо контакту з таким id не існує.
// node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6

// # Додаємо контакт та виводимо в консоль об'єкт новоствореного контакту
// node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22

// # Видаляємо контакт та виводимо в консоль об'єкт видаленого контакту або null, якщо контакту з таким id не існує.
// node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH