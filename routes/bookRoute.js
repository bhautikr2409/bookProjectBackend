const express = require('express')
const {getAllBooks , addBook , editBook , deleteBook} = require('../contolers/bookControler')

const router = express.Router()

// Add request logging middleware
router.use((req, res, next) => {
    next();
});


router.get('/app/books' , getAllBooks)
router.post('/app/books' , addBook)
router.put('/app/books/:id' , editBook)
router.delete('/app/books/:id' , deleteBook)


module.exports= router