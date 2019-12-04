const { Router } = require('express')
const router = Router()
let Book = require('../models/book')
const bookController = require('../models/book_controller')
const upload = require('../libs/storage')
const ejs = require('ejs')

router.get('/', async function (req, res) {
    let consulta = req.query.search
    if (consulta) {
        await bookController.ToListByTitle(consulta, (err, book) => {
            if (err) { throw new Error(err) }
            let search = true
            res.render('index.ejs', {
                book,
                search
            })  
        })
        return
    }
    await bookController.ToList((err, book) => {
        if (err) { throw new Error(err) }
        let search = true
        res.render('index.ejs', {
            book,
            search
        })
    })
})
router.get('/new-entry', (req, res) => {
    res.render('new-entry', {
        succesfull: 0
    })
})
router.post('/new-entry', upload.single('image'), bookController.Save)
router.get('/edit', async function (req, res) {
    let book, bookToEdit
    if (req.query.id) {
        await Book.findOne({ id: req.query.id }, (err, littleBook) => {
            bookToEdit = littleBook
        })
    }
    await Book.find({}, (req, littleBbook) => {
        book = littleBbook
    })
    res.render('edit', {
        edit: 0,
        bookToEdit,
        book,
        edit: 'disabled'
    })
})
router.post('/edit', upload.single('image'), bookController.Edit)
router.get('/delete/:id', async function (req, res) {
    await bookController.Delete(req.params.id, (err, book) => {
        if (err) { throw new Error(err) }
        res.redirect('/')
    })
})
router.get('/search', async function (req, res) {
    let search = req.query.num
    // search = parseInt(search)
    console.log(typeof search)
    console.log(search)
    typeof search == 'undefined' || search == 'NaN' || search <= 0 ? search = 1 : search = parseInt(search)
    let cantTotal = await Book.estimatedDocumentCount({}, (err, number) => { if (err) { throw new Error(err) } })
    console.log(cantTotal)
    let mostrarHasta = 3
    let searchMax = cantTotal / mostrarHasta
    console.log(searchMax)
    search >= searchMax ? search = parseInt(searchMax)+1 : ''
    let mostrarDesde = (search - 1) * 3
    cantTotal < mostrarHasta ? mostrarDesde = search - 1 : ''
    let book = await Book.find({}, (err, bookWanted) => { if (err) { throw new Error(err) } })
        .limit(mostrarHasta)
        .skip(mostrarDesde)
    // search = parseInt(search)
    res.render('search', {
        book,
        search
    })
})
router.get('/book', async function (req, res) {
    let bookTitle = req.query.search
    let book
    await bookController.ToListByTitle(bookTitle, (err, books) => {
        book = books
    })
    console.log(book)
    let search = null
    res.render('books', {
        book,
        search
    })
})
router.get('/book/id/:id', async function (req, res) {
    let IDBook = req.params.id
    console.log(IDBook)
    let book
    await bookController.WantedById(IDBook, (err, bookWanted) => {
        if (err) { throw new Error(err) }
        book = bookWanted
    })
    let search = null
    console.log(book)
    res.render('book', {
        book,
        search
    })
})

router.get('/register',(req, res)=>{
    res.render('signin')
})

router.post('/signup', (req, res)=>{
    res.json('signup')
})

router.post('/signin', (req, res)=>{
    res.json('signin')
})

router.get('/dashbord', (req, res)=>{
    res.json('dashbord')
})
module.exports = router