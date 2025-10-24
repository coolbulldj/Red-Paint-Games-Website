import express from 'express';

import { PurchaseFrameworks } from './paymentUtil.mjs';

import fs from 'fs'

import path from 'path'

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

/*
const sqlite3 = require('sqlite3').verbose();

const download_folder_url = '/downloads'

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


const sql = 'SELECT * FROM userdata'
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
})) 
//Process 


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
*/


const app = express();

const UserAgreementVersion = "v1"; //Increase this value anytime the user agreement changes

const APIKEY = process.env.CRYPT_SECRET || 'backward_key'

const frontend_path = path.join(__dirname, "..", "frontend");

app.use(
    express.json(),
    express.static(frontend_path),
)

const test_account_list = new Map([
    [
        "blank",
        {
            password: "abc",
            owned_frameworks: [
                "Obby", "Avatar Shopping"
            ]
        }
    ]
])



app.get('/', (req, res) => {
    res.sendFile(path.join(frontend_path, 'home.html'));
})

/*app.post('/api/process_framework', (req, res) => {
    const token = req.headers['api-key']
}) */

app.post('/api/process_framework', express.json(), (req, res) => {
  // Handle both GET (default) and POST (if post=1 was set)
  const webhookData = req.body;
  const { 
    uuid,
    address_in, 
    address_out, 
    txid_in, 
    txid_out, 
    confirmations, 
    value_coin, 
    value_coin_convert,
    value_forwarded_coin,
    value_forwarded_coin_convert,
    fee_coin,
    coin,
    price,
    pending
  } = webhookData;
  // Custom parameters are ALWAYS delivered via the query string
  const { order_id, user_id } = req.query;
  
  // Note: order_id and user_id come from the callback URL query string
  
  // Check if we've already processed this transaction
  const alreadyProcessed = checkTransactionInDatabase(uuid);
  
  if (!alreadyProcessed) {
    if (pending === 1) {
      // Payment detected but not confirmed
      console.log(`Pending payment for ${order_id || user_id}: ${value_coin} ${coin.toUpperCase()} to ${address_in}`);
      console.log(`UUID: ${uuid}, Price: $${price}`);
      
      // Store transaction in database with UUID
      storeTransaction({
        uuid: uuid,
        address_in: address_in,
        address_out: address_out,
        txid_in: txid_in,
        amount: value_coin,
        coin: coin,
        price: price,
        status: 'pending',
        value_coin_convert: value_coin_convert,
        processed_at: new Date()
      });
      
      // Notify user (WebSocket, email, etc.)
      notifyUser(address_in, 'pending', {
        uuid: uuid,
        amount: value_coin,
        coin: coin,
        usd_value: value_coin_convert ? JSON.parse(value_coin_convert).USD : null
      });
      
    } else if (pending === 0) {
      // Payment confirmed
      console.log(`Confirmed payment for ${order_id || user_id}: ${value_coin} ${coin.toUpperCase()} to ${address_in}`);
      console.log(`UUID: ${uuid}, Forwarded: ${value_forwarded_coin}, Fee: ${fee_coin}`);
      
      // Update database
      updateTransaction(uuid, {
        txid_out: txid_out,
        confirmations: confirmations,
        value_forwarded_coin: value_forwarded_coin,
        value_forwarded_coin_convert: value_forwarded_coin_convert,
        fee_coin: fee_coin,
        status: 'confirmed',
        confirmed_at: new Date()
      });
      
      // Process order, send confirmation email, etc.
      processSuccessfulPayment(uuid, {
        orderId: order_id,
        userId: user_id,
        amount: value_coin,
        forwarded_amount: value_forwarded_coin,
        fee: fee_coin,
        coin: coin,
        confirmations: confirmations
      });
      
      // Notify user
      notifyUser(address_in, 'confirmed', {
        uuid: uuid,
        amount: value_coin,
        forwarded_amount: value_forwarded_coin,
        coin: coin,
        confirmations: confirmations
      });
    }
  } else {
    console.log(`Duplicate webhook received for UUID: ${uuid}`);
  }
  
  // Always respond with *ok* or HTTP 200 to stop retries
  res.status(200).send('*ok*');
});

app.post('/api/purchase_framework', (req, res) => {
    const protocol = req.protocol;        // "http" or "https"
    const host = req.get('host');         // domain + port (e.g., "localhost:3000")
    const baseUrl = `${protocol}://${host}`;

    const frameworks = req.body.frameworks
    
    PurchaseFrameworks(frameworks, baseUrl)
    .then((response) => {
        const purchase_data = response.purchase_data
        const usd_cost = response.usd
        const client_data = {
            "address" : purchase_data.address_in,
            "ticker" : "sol/sol",
            "usd": usd_cost,
        }
        res.json(client_data);
    })
})

app.post('/api/verify_login', (req, res) => {
    const body = req.body

    if (!test_account_list.has(body.username)) {
        res.send("Invalid username")
        return
    }

    const user_data = test_account_list.get(body.username)

     if (user_data.password != body.password) {
        res.send("Invalid password")
        return
    }

    res.sendStatus(204)
})

app.post('/api/get_owned_frameworks', (req, res) => {
    const body = req.body

    if (!test_account_list.has(body.username)) {
        res.sendStatus(204)
        return
    }

    const user_data = test_account_list.get(body.username)

     if (user_data.password != body.password) {
        res.sendStatus(204)
        return
    }
    res.json(user_data.owned_frameworks)
})

app.post('/api/download', (req, res) => {
    const body = req.body

    //Verify Login

    if (!test_account_list.has(body.username)) {
        console.log("Invalid username")
        return
    }

    const user_data = test_account_list.get(body.username)

     if (user_data.password != body.password) {
        console.log("Invalid password")
        return
    }

    if (!user_data.owned_frameworks.includes(body.download_name)) {
        console.log("doesn't owned framework", user_data.name)
        return
    }

    const filePath = path.join(__dirname, download_folder_url, `${body.download_name}.jpg`);


    if (!fs.existsSync(filePath)) {
        console.log(filePath)
        console.log("file not found")
        return res.status(404).send("File not found");
    }

    // Send file for download
    res.download(filePath, body.download_name+".jpg", err => {
        if (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).send("Error downloading file");
            }
        }
    });
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