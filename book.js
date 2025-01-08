const express = require('express');
const cors = require('cors');
const {connectDB} = require('./connect')

const Books = require('./model/books/books')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


connectDB('mongodb://0.0.0.0:27017/book')
.then(() => console.log('Connected!'))
    .catch((err) => {
        console.error('Connection failed:', err.message);
        process.exit(1); 
    });



app.get('/app/books', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Books not found', error: err });
    }
});

app.post('/app/books', async (req, res) => {
    const { title, author, price, description, image } = req.body;
    try {
        const book = new Books({ title, author, price, description, image });
        await book.save();
        res.status(201).json({ message: 'Book added' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add book', error: err });
    }
});

app.put('/app/books/:id', async (req, res) => {
    try {
        const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated', book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book', error: err });
    }
});

app.delete('/app/books/:id', async (req, res) => {
    try {
        const book = await Books.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted', data: book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});