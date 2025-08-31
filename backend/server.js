const express = require('express');
const path = require('path');
const app = express();

const frontend_path = path.join(__dirname, "..", "frontend");

app.use(express.static(frontend_path))

app.get('/', (req, res) => {
    res.sendFile(path.join(frontend_path, 'home.html'))
});

app.get('/api/contact', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/contact/:', (req, res) => {
    res.send(req.query);
})

//Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`))

