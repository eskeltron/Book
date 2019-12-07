const { Router } = require('express')
const router = Router()
let Book = require('../models/book')
const bookController = require('../models/book_controller')
const upload = require('../libs/storage')
const userController = require('../models/user_controller')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const verifyToken = require('../controllers/virifyToken')

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
    typeof search == 'undefined' || search == 'NaN' || search <= 0 ? search = 1 : search = parseInt(search)
    let cantTotal = await Book.estimatedDocumentCount({}, (err, number) => { if (err) { throw new Error(err) } })
    let mostrarHasta = 3
    let searchMax = cantTotal / mostrarHasta
    Number.isInteger(searchMax) ? '' : searchMax = parseInt(searchMax) + 1
    search >= searchMax ? search = searchMax : ''
    let mostrarDesde = (search - 1) * 3
    cantTotal < mostrarHasta ? mostrarDesde = search - 1 : ''
    let book = await Book.find({}, (err, bookWanted) => { if (err) { throw new Error(err) } })
        .limit(mostrarHasta)
        .skip(mostrarDesde)
    res.render('search', {
        book,
        search,
        searchMax
    })
})
router.get('/book', async function (req, res) {
    let bookTitle = req.query.search
    let book
    await bookController.ToListByTitle(bookTitle, (err, books) => {
        book = books
    })
    let search = null
    res.render('books', {
        book,
        search
    })
})
router.get('/book/id/:id', async function (req, res) {
    let IDBook = req.params.id
    let book
    await bookController.WantedById(IDBook, (err, bookWanted) => {
        if (err) { throw new Error(err) }
        book = bookWanted
    })
    let search = null
    res.render('book', {
        book,
        search
    })
})
router.get('/signin', (req, res) => {
    res.render('signin')
})
router.post('/signin', async function (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) { return res.render('signin', { err: "The email is invalid" }) }
    const validPassword = await user.validatePassword(password)
    if (!validPassword) { return res.render('signin', { err: 'The password is invalid' }) }
    const token = jwt.sign({id: user.id }, process.env.SECRET, {
        expiresIn: "1h"
    })
    res.cookie('token',token)
    res.redirect('profile')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})
router.post('/signup', userController.Save)
router.get('/profile', verifyToken, async function (req, res) {
    const user = await User.findOne({ id: req.userId }, { password: 0 })
    console.log(user)
    if (!user) {
        return res.render('profile',{user:{username:'no token provided'}})
    }
    res.render('profile',{
        user
    })
})
module.exports = router