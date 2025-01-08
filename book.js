const express = require('express');
const cors = require('cors');
const {connectDB} = require('./connect')
const bookRoute = require('./routes/bookRoute')
const bodyParser = require('body-parser');

connectDB('mongodb://0.0.0.0:27017/book')
.then(() => console.log('Connected!'))
    .catch((err) => {
        console.error('Connection failed:', err.message);
        process.exit(1); 
    });


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())


app.use("/" , bookRoute)



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});