const { Router } = require("express");
const router = Router();
let Book = require("../models/book");
const bookController = require("../models/book_controller");
const upload = require("../libs/storage");
const userController = require("../models/user_controller");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = require("../controllers/virifyToken");
const getUser = require("../controllers/getUser");

router.get("/", async function (req, res) {
    let userLog = await getUser(req),
        consulta = req.query.search
    if (consulta) {
        await bookController.ToListByTitle(consulta, (err, book) => {
            if (err) { throw new Error(err) }
            let search = true
            res.render("index.ejs", {
                book,
                userLog,
                search
            })
        })
        return
    }
    await bookController.ToList((err, book) => {
        if (err) { throw new Error(err) }
        let search = true
        res.render("index.ejs", {
            book,
            userLog,
            search
        })
    })
})
router.get("/new-entry", async (req, res) => {
    const userLog = await getUser(req)
    if (typeof userLog != 'undefined') {
        userLog.admin ? res.render("new-entry", { userLog }) : res.redirect("/")
    } else {
        res.redirect("/")
    }
})
router.post("/new-entry", upload.single("image"), bookController.Save)
router.get("/edit", async function (req, res) {
    const userLog = await getUser(req)
    if (typeof userLog != 'undefined') {
        if (userLog.admin) {
            let book, bookToEdit
            if (req.query.id) {
                await Book.findOne({ id: req.query.id }, (err, littleBook) => {
                    bookToEdit = littleBook
                })
            }
            await Book.find({}, (req, littleBbook) => {
                book = littleBbook
            })
            res.render("edit", {
                bookToEdit,
                book,
                userLog
            })
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }


})
router.post("/edit", upload.single("image"), bookController.Edit)
router.get("/delete/:id", async function (req, res) {
    const userLog = await getUser(req)
    if (typeof userLog != 'undefined') {
        if (userLog.admin) {
            await bookController.Delete(req.params.id, (err, book) => {
                if (err) { throw new Error(err) }
                res.redirect("/")
            })
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }

})
router.get("/search", async function (req, res) {
    const userLog = await getUser(req)
    let search = req.query.num
    typeof search == "undefined" || search == "NaN" || search <= 0 ? search = 1 : search = parseInt(search)
    let cantTotal = await Book.estimatedDocumentCount({}, (err, number) => { err ? console.log('error') : "" })
    if (cantTotal > 0) {
        let mostrarHasta = 3
        let searchMax = cantTotal / mostrarHasta
        Number.isInteger(searchMax) ? "" : searchMax = parseInt(searchMax) + 1
        search >= searchMax ? search = searchMax : ""
        let mostrarDesde = (search - 1) * 3
        cantTotal < mostrarHasta ? mostrarDesde = search - 1 : ""
        let book = await Book.find({}, (err, bookWanted) => { if (err) { throw new Error(err) } })
            .limit(mostrarHasta)
            .skip(mostrarDesde)
        res.render("search", {
            book,
            search,
            searchMax,
            userLog
        })
    }else{
        res.redirect("/")
    }
})
router.get("/book", async function (req, res) {
    const userLog = await getUser(req)
    let bookTitle = req.query.search
    let book
    await bookController.ToListByTitle(bookTitle, (err, books) => {
        book = books
    })
    let search = null
    res.render("books", {
        book,
        search,
        userLog
    })
})
router.get("/book/id/:id", async function (req, res) {
    const userLog = await getUser(req)
    let IDBook = req.params.id
    let book
    await bookController.WantedById(IDBook, (err, bookWanted) => {
        if (err) { throw new Error(err) }
        book = bookWanted
    })
    let search = null
    res.render("book", {
        book,
        search,
        userLog
    })
})
router.get("/signin", async (req, res) => {
    const logUser = await getUser(req)
    logUser ? res.redirect(`/profile/${logUser.username}`) : res.render("signin")
})
router.post("/signin", async function (req, res) {
    let token = verifyToken(req, res)
    if (token != 1 && token != 0) {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) { return res.render("signin", { err: "The email is invalid" }) }
        const validPassword = await user.validatePassword(password)
        if (!validPassword) { return res.render("signin", { err: "The password is invalid" }) }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1h" })
        console.log(token)
        res.cookie("token", token)
        res.redirect(`profile/${user.username}`)
    } else {
        res.redirect("/")
    }
})
router.get("/signup", async (req, res) => {
    let logUser = await getUser(req)
    logUser ? res.redirect(`/profile/${logUser.username}`) : res.render("signup")
})
router.post("/signup", userController.Save)
router.get("/profile/:username", async function (req, res) {
    const userLog = await getUser(req)
    let user = await User.findOne({ username: req.params.username }, { password: 0 })
    if (user != null) {
        if (typeof userLog != 'undefined') {
            if (userLog.username == req.params.username) {
                res.render("profile", {
                    user: userLog,
                    userLog
                })
                return
            }
        } else {
            res.render("profile", {
                user,
                userLog
            })
            return
        }
    }
    res.render("profile", {
        userLog
    })
})
router.post("/logout", async (req, res) => {
    res.clearCookie("token")
    res.redirect("/signin")
})
module.exports = router