const axios = require('axios');


const apiUrl = "http://labs.bible.org/api/?passage=random&type=json";


const TelegramBot = require('node-telegram-bot-api');
const token = '732735835:AAGR68wEvzzm7_5FZwwli8vsA4dAMeLmIH4';
const bot = new TelegramBot(token, {polling: true});
bot.onText(/\/verse/, (msg, match) => {
    const chatId = msg.chat.id;

    axios.get(apiUrl) 
    .then(function(val) {
        
        let verseval = val.data[0];

        const verse = verseval.text+" - "+verseval.bookname+" "+verseval.chapter+":"+verseval.verse;
 
        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, verse);
        
    })
    .catch(function(e) {
        // This is where you run code if the server returns any errors
        bot.sendMessage(chatId, "Some error");
        console.log(e)
    });

  });
  
  // Listen for any kind of message. There are different kinds of
  // messages.
//   bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
  
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
//   });
