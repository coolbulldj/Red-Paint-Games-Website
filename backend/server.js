const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/userdata.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("database connection successful")
})

//db.run('CREATE TABLE userdata(email, name, discord, phone, ip, message, type)')

/*const sql = `INSERT INTO userdata (email, name, discord, phone, ip, message, type)
VALUES(?,?,?,?,?,?,?)`; */

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

db.all(sql, [], (err, rows)=> {
    if (err) return console.error(err.message);

    rows.forEach((row) => {
        console.log(row)
    })
})


db.close((err) => {
    if (err) return console.err(err.message)
})

const bodyParser = require('body-parser')
const path = require('path');
const app = express();

console.log(__dirname)

const frontend_path = path.join(__dirname, "..", "frontend");

console.log(frontend_path)

app.use(
    express.json(),
    express.static(frontend_path)
)


app.get('/', (req, res) => {
    res.sendFile(path.join(frontend_path, 'home.html'));
})

app.post('/api/contact', (req, res) => {
    console.log(req.body)

    const ip = req.ip

    if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', ''); // normalize IPv4


    const sql = `INSERT INTO userdata (email, name, discord, phone, ip, message, type)
VALUES(?,?,?,?,?,?,?)`;

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
        ], 
        (err => {
            if (err) return console.error(err.message);

            console.log('New data has been inserted')
        })
    )


    return res.sendStatus(200);
})

//Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`))

