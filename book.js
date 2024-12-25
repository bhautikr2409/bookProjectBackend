// const express = require("express");
// const cors = require("cors");
// const { default: mongoose } = require("mongoose");
// const Books = require("./model/books/books");
// const Products = require("./model/products/product");
// // const { Books } = require("./model/books/books");

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors());

// mongoose
//   .connect("mongodb://0.0.0.0:27017/book")
//   .then(() => console.log("Connected!"))
//   .catch((err) => console.log("conection failed", err));

// // const BookSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   author: { type: String, required: true },
// //   price: { type: String, required: true },
// //   description: { type: String, required: true },
// //   image: { type: String, required: true },
// // });

// // const Book = mongoose.model("books", BookSchema);

// // app.get("/app/books/:id", async (req, res) => {
// //   try {
// //     const book = await Books.findOne({ _id: req.params.id });
// //     // res.json(books);
// //     // const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
// //     if (!book) return res.status(404).json({ message: "Book not found" });
// //     res.json({ message: "Book updated", book });
// //   } catch (err) {
// //     res.status(500).json({ message: "Book not found", error: err });
// //   }
// // });


// app.get("/app/books", async (req, res) => {
//     try {
//       const books = await Books.find(); 
//       res.json(books);
//     } catch (err) {
//       res.status(500).json({ message: "Error fetching books", error: err });
//     }
//   });
  

// app.post("/app/books", async (req, res) => {
//   const { title, author, price, description, image } = req.body;
//   try {
//     const book = new Book({ title, author, price, description, image });
//     await book.save();
//     res.status(201).json({ message: "Book added" });
//   } catch (err) {
//     res.status(500).json({ message: "Book not found", error: err });
//   }
// });

// // put the book

// app.put("/app/books/:id", async (req, res) => {
//   try {
//     const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!book) return res.status(404).json({ message: "Book not found" });
//     res.json({ message: "Book updated", book });
//   } catch (err) {
//     res.status(500).json({ message: "Book not found", error: err });
//   }
// });

// // delete the book

// app.delete("/app/books/:id", async (req, res) => {
//   try {
//     const book = await Books.findByIdAndDelete(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });
//     res.json({ message: "Book deleted", data: book });
//   } catch (err) {
//     res.status(500).json({ message: "Book not found", error: err });
//   }
// });




// // product api
// app.get("/api/products", async (req, res) => {
//   try {
//     const data = await Products.find();
//     res.json(data);
//     console.log("data", data);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching data", error: err });
//   }
// });

// app.post("/api/products", async (req, res) => {
//   const { title, price, description, image } = req.body;
//   try {
//     const newData = new Products({ title, price, description, image });
//     await newData.save();
//     res.status(201).json({ message: "Data added successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding data", error: err });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/book')
    .then(() => console.log('Connected!'))
    .catch((err) => console.log("Connection failed", err));

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

const Book = mongoose.model('books', BookSchema);

app.get('/app/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Books not found', error: err });
    }
});

app.post('/app/books', async (req, res) => {
    const { title, author, price, description, image } = req.body;
    try {
        const book = new Book({ title, author, price, description, image });
        await book.save();
        res.status(201).json({ message: 'Book added' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add book', error: err });
    }
});

app.put('/app/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated', book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book', error: err });
    }
});

app.delete('/app/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted', data: book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});