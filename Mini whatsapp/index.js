const express = require('express'); // require express
const app = express();

const mongoose = require('mongoose'); // require mongoose
const path = require('path'); // require path
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');  // require method-override

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main().then(() => console.log(`connection successfully`))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.get("/", (req, res) => {
  res.render("home.ejs");
});

// show all chats
app.get("/chats", async(req, res) => {
  let chats = await Chat.find();
  res.render("showChats.ejs", { chats });
});

// create new chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/chats", (req, res) => {
  let { from, message, to } = req.body;
  let chat = new Chat({
    from: from,
    message: message,
    to: to,
    created_at: new Date()
  });
  chat.save().then((data) => console.log(`chat was saved`))
  .catch((err) => console.log(err));
  res.redirect("/chats");
});

// update chat
app.get("/chats/:id/edit", async(req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});
app.patch("/chats/:id", async(req, res) => {
  let { id } = req.params;
  let { message: newMsg } = req.body;
  await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
  res.redirect("/chats");
});

// delete chat
app.delete("/chats/:id", async(req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.listen(8080, () => console.log('listening server to port 8080'));