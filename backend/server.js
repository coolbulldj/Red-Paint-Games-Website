const express = require('express');
const nodemailer = require('nodemailer');
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
    console.log(req.body)
    
    //const transporter = nodemailer.createTransport()

    return res.sendStatus(200);
})

//Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`))

