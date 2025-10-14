const express = require('express');

const cookieParser = require('cookie-parser');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/userdata.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("database connection successful")
})

db.serialize(() => {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='userdata'", (err, row) => {
        if (err) {  
            console.error("Error checking table existence:", err.message);
        } else if (row) {
            console.log("db already exists")
        } else {
           db.run('CREATE TABLE userdata(email, name, discord, phone, ip, message, type, read)')
        }
    })
})

/* const sql = 'SELECT * FROM userdata'
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
    const sql = `INSERT INTO userdata (email, name, discord, phone, ip, message, type, read)
VALUES(?,?,?,?,?,?,?,?)`;

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

const UserAgreementVersion = "v1"; //Increase this value anytime the user agreement changes


const frontend_path = path.join(__dirname, "..", "frontend");

app.use(
    express.json(),
    express.static(frontend_path),
    cookieParser()
)

function verifyUserAgreement(req, res) {
    const AgreementVersion = req.cookies.AgreementVersion;

    if (!AgreementVersion || AgreementVersion != UserAgreementVersion) {
        return false;
    }
    return true;
}

app.get('/', (req, res) => {
    const isAgreed = verifyUserAgreement(req, res);
    console.log("User is agreed?:", isAgreed)
    console.log("Users cookies is:", req.cookies)
    if (!isAgreed) {
        res.sendFile(path.join(frontend_path, 'UserAgreement.html'));
        return;
    }
    res.sendFile(path.join(frontend_path, 'home.html'));
})

app.post('/api/verifyUserAgreement', (req, res) => {
    console.log("Verifying user agreement")
    let AgreementVersion = req.cookies.AgreementVersion;
    if (!AgreementVersion || AgreementVersion != UserAgreementVersion) {
        res.cookie(
            'AgreementVersion',
            UserAgreementVersion, 
            { maxAge: 900000, httpOnly: true }
        )
    }
    console.log("User agreement verified", UserAgreementVersion)
    console.log("User cookies:", req.cookies)
    res.send()
});

app.post('/api/contact', (req, res) => {
    const req_body = req.body;

    const ip = req.ip;

    if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', ''); // normalize IPv4

    AddData([
        req_body.email,
        req_body.name,
        req_body.discord,
        req_body.phone,
        ip,
        req_body.message,
        "contact",
        false, //This is the boolean on whether the data has been read
    ])

    //PrintOffDb();

    return res.sendStatus(200);
})

app.get('/userdb', (req, res) => {
    res.sendFile(path.join(frontend_path, 'userdata.html'))
})

app.post('/api/users', (req, res) => {
    const sql = 'SELECT * FROM userdata'

    if (req.body.password !== 'ThePasswordBallers') {
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