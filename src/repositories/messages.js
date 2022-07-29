const config = require('../options/config')
const firebaseClient = require("./firebase")
const messagesApi = new firebaseClient(config.firebase, "mensajes");

const messages = []

const lastMessage = async () => {
  try {
    if (messages.length == 0) {
      messages.push(await messagesApi.readAll())
    }
    else {
      await messagesApi.createMessagesTable()
      await messagesApi.addElements(messages)
    }
  }
  catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

module.exports = { messages, messagesApi, lastMessage }