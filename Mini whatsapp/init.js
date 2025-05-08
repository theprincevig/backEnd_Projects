const Chat = require('./models/chat.js');   // require chat schema

 // require mongoose
const mongoose = require('mongoose');

main().then(() => console.log(`connection successfully`))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chats = [
    {
        from: "Prince",
        to: "Faizan",
        message: "Sorry, bro my project is not ready yet",
        created_at: new Date()
    },
    {
        from: "Zaid",
        to: "Faizan",
        message: "Hey, bro wassup",
        created_at: new Date()
    },
    {
        from: "Nancy",
        to: "Richa",
        message: "Hey, I guess I'll be late coming home",
        created_at: new Date()
    },
    {
        from: "Prince",
        to: "Zaid",
        message: "I'm talk to you later",
        created_at: new Date()
    },
    {
        from: "Sarthak",
        to: "Rajat",
        message: "Can you send my pictures now?",
        created_at: new Date()
    },
    {
        from: "Dev",
        to: "Nikhil",
        message: "Hey brother, please come home ASAP",
        created_at: new Date()
    },
    {
        from: "Aisshhh",
        to: "Soumya",
        message: "Soumya, I heard your 12th board results are coming out, lemme know your percentage!",
        created_at: new Date()
    },
    {
        from: "Kishan",
        to: "Renu",
        message: "What to buy from the grocery shop?",
        created_at: new Date()
    },
    {
        from: "Faizan",
        to: "Zaid",
        message: "I'm absolutely fine. How about you, bro?",
        created_at: new Date()
    }
];

Chat.insertMany(chats);