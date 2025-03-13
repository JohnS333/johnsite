// const {readFile, readFileSync} = require('fs');
// const txt = readFileSync('./hello.txt', 'utf8');
// console.log(txt);

// console.log('ASAP TEXT');

const express = require('express');
const { readFile } = require('fs').promises; // Destructure readFile from fs module

const app = express();

// Serve static files from the '.' directory, aka the one we are in, src
app.use(express.static('.'));      

app.get('/', async (request, response) => { 
    response.send(
    await readFile('./index.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('Sorry, out of order');
        }
        response.send(html);
    })
)
});

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));