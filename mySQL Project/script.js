const { faker } = require('@faker-js/faker');   // require faker-js
const path = require("path");   // require path

// require express
const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/backEnd_Projects/mySQL Project/photo/user_image.png", express.static(path.join(__dirname, "photo")));

// require method-override
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


// require mySql2
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'my_app',
    password: 'princev1105'
});



// // insert data in Bulk...
// /* generate fake users data using faker-js */
// function getRandomUser() {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(), // before version 9.1.0, use userName()
//         faker.internet.email(),
//         faker.internet.password()
//     ];
// }

// let data = [];
// for (let index = 1; index <= 100; index++) {
//     data.push(getRandomUser()); // add all 100 fake users in data[]
// }

// // now, insert data in userDB
// let q = `INSERT INTO user (id, username, email, password, avatar) VALUES ?`;
// connection.query(q, [data], (error, result) => {
//     try {
//         if (error) throw error;
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// });
// connection.end();



// home page
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) FROM user`;
    try {
        connection.query(q, (error, result) => {
        if (error) throw error;
        let count = result[0]["COUNT(*)"];
        res.render("home.ejs", { count });
    });
    } catch (error) {
        res.send(`something is wrong in your DATABASE!!`);
    }
});

// show all users
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (error, users) => {
        if (error) throw error;
        res.render("showUsers.ejs", { users });
    });
    } catch (error) {
        res.send(`something is wrong in your DATABASE!!`);
    }
});

// edit users
app.get("/user/:id/edit", (req, res) => {
    let {id } = req.params;
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    try {
        connection.query(q, (error, result) => {
        if (error) throw error;
        let user = result[0];
        res.render("edit.ejs", { user });
    });
    } catch (error) {
        res.send(`something is wrong in your DATABASE!!`);
    }
});
// AND update user from DATABASE
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPassword, username: newUsername } = req.body;

    let q = `SELECT * FROM user WHERE id = "${id}"`;    // query for find the user using userID
    try {
        connection.query(q, (error, result) => {
        if (error) throw error;

        let user = result[0];
        if (formPassword != user.password) {
            res.send(`OOPSS! you entered wrong password`);

        } else {
            /* here's using NESTED QUERY */
            let q2 = `UPDATE user SET username = "${newUsername}" WHERE id = "${id}"`;  // query2 for update the user details using userID
            connection.query(q2, (err, result) => {
                if (err) throw err;
                res.redirect("/user");
            });
        }
    });
    } catch (error) {
        res.send(`something is wrong in your DATABASE!!`);
    }
});

// add a new user
app.get("/user/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/user", (req, res) => {
    /* generate a new id using faker-js */
    const avatar = `/backEnd_Projects/mySQL Project/photo/user_image.png`;
    let id = faker.string.uuid();
    let { username, email, password } = req.body;
    let user = [[id, username, email, password, avatar]]; // Wrap the user in another array because "connection.query()" expects the second argument to be an array of arrays

    let q = `INSERT INTO user (id, username, email, password, avatar) VALUES ?`;
    try {
        connection.query(q, [user], (error, result) => {
            if (error) throw error;
            res.redirect("/user");
        });
    } catch (error) {
        res.send(`something is wrong in your DATABASE!!`);
    }
});

// delete user
app.delete("/user/:id", (req, res) => {
    let { id } = req.params;
    let q = `DELETE FROM user WHERE id = "${id}"`;
    try {
        connection.query(q, (error, result) => {
            if (error) throw error;
            res.redirect("/user");
        });
    } catch (error) {
        res.send(`something is wrong in your DATABASE!!`);
    }
});

app.listen(8080, () => console.log("listening server to port 8080"));