const Books = require('../model/books/books')

async function  getAllBooks(req , res) {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Books not found', error: err });
    }
}


async function addBook(req , res) {
    const { title, author, price, description, image } = req.body;
    try {
        const book = new Books({ title, author, price, description, image });
        await book.save();
        res.status(201).json({ message: 'Book added' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add book', error: err });
    }
}

async function editBook(req , res) {
    try {
        const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated', book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book', error: err });
    }
}


async function deleteBook(req , res) {  
    try {
        const book = await Books.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted', data: book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book', error: err });
    }
}

module.exports = {getAllBooks , addBook , editBook , deleteBook}