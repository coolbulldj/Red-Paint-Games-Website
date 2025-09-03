const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/userdata.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("database connection successful")
})

/*  db.run('CREATE TABLE userdata(email, name, discord, phone, ip, message, type)')

const sql = `INSERT INTO userdata (email, name, discord, phone, ip, message, type)
VALUES(?,?,?,?,?,?,?)`;  */

const sql = 'SELECT * FROM userdata'

/*
db.run(
    sql, 
    [
    'matthewjcdt@gmail.com',
    'matt',
    'coolbulldj',
    '12345678910',
    '192.2910.102',
    'hello world',
    'test'
], (err => {
    if (err) return console.error(err.message);

    console.log('New data has been inserted')
})) */


//Update data
function AddData(data) {
    const sql = `INSERT INTO userdata (email, name, discord, phone, ip, message, type)
VALUES(?,?,?,?,?,?,?)`;

    db.run(
        sql, 
        data, 
        (err => {
            if (err) return console.error(err.message);
        })
    ) 
}

function PrintOffDb() {
    console.log("printing off db")
    //Display data
    db.all(sql, [], (err, rows)=> {
        if (err) return console.error(err.message);

        rows.forEach((row) => {
            console.log(row)
        })
    })
}

function CloseDB() {
    db.close((err) => {
        if (err) return console.err(err.message)
    })
}

const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const frontend_path = path.join(__dirname, "..", "frontend");

app.use(
    express.json(),
    express.static(frontend_path)
)


app.get('/', (req, res) => {
    res.sendFile(path.join(frontend_path, 'home.html'));
})

app.post('/api/contact', (req, res) => {
    const req_body = req.body;

    const ip = req.ip;

    AddData([
        req_body.email,
        req_body.name,
        req_body.discord,
        req_body.phone,
        ip,
        req_body.message,
        "contact",
    ])

    if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', ''); // normalize IPv4

    PrintOffDb();

    return res.sendStatus(200);
})

app.get('/api/users/:password', (req, res) => {
    console.log(req.params)

    if (req.params.password !== 'current_password') {
        return res.sendStatus(403);
    }

    let json_table = [];

    db.all(sql, [], (err, rows)=> {
        if (err) return console.error(err.message);

        rows.forEach((row) => {
            json_table.push(row);
        });
        res.json(json_table);
    })
})


//Shutdown Processes
function ProcessShutdown() {
    console.log("closing server")
    CloseDB();
}

process.on("SIGTERM", ProcessShutdown)
process.on('SIGINT', ProcessShutdown)

//Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`))