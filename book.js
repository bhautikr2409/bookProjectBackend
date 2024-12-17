const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express()
const port = 3000


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/book',)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log("conection failed", err));

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
})

const Book = mongoose.model('books', BookSchema);
app.get('/app/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    }
    catch (err) {
        res.status(500).json({ message: 'Book not found', error: err });
    }
})

app.post('/app/books', async (req, res) => {
    const {title,author,price,description,image} = req.body
    try {
        const book = new Book({title,author,price,description,image});
        await book.save();
        res.status(201).json({ message: 'Book added'});
    }
    catch (err) {
        res.status(500).json({ message: 'Book not found', error: err });
    }
})

// put the book

app.put('/app/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!book) return res.status(404).json({message: 'Book not found'});
        res.json({message: 'Book updated', book});
    }
    catch (err) {
        res.status(500).json({ message: 'Book not found', error: err });
    }
})

// delete the book


app.delete('/app/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) return res.status(404).json({message: 'Book not found'});
        res.json({message: 'Book deleted'});
    }
    catch (err) {
        res.status(500).json({ message: 'Book not found', error: err });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});