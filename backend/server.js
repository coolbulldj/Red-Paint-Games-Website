const express = require('express');
const nodemailer = require('nodemailer');
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
    console.log("opening web")
    res.sendFile(path.join(frontend_path, 'home.html'));
})

app.post('/api/contact', (req, res) => {
    console.log(req.body)
    
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "me@gmail.com",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        },
    });

    const mailOptions = {
        from: "your_email@gmail.com",
        to: "recipient@example.com",
        subject: "Hello from Nodemailer",
        text: "This is a test email sent using Nodemailer.",
    };

   

    return res.sendStatus(200);
})

//Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`))

