let Book = require('./book')
const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const getUser = require("../controllers/getUser");

async function save(req, res) {
    const userLog = await getUser(req)
    if (typeof userLog != 'undefined') {
        if (userLog.admin) {
            try {
                const { title, author, description, status } = req.body
                const book = Book({
                    title,
                    author,
                    id: uuid(),
                    description,
                    status
                })
                if (req.file) {
                    const { filename } = req.file
                    book.setImgUrl(filename)
                }
                await book.save()
                res.render('new-entry', {
                    succesfull: true,
                    userLog
                })
            }
            catch (e) {
                res.render('new-entry', {
                    error: true,
                    userLog
                })
            }
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}
async function edit(req, res) {
    const userLog = await getUser(req)
    if (typeof userLog != 'undefined') {
        if (userLog.admin) {
            try {
                const { title, author, id, description, status } = req.body
                await eliminarFoto(id)
                const { filename } = req.file
                await Book.updateOne({ id }, {
                    title,
                    author,
                    id,
                    image: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/public/${filename}`,
                    description,
                    status
                })
                let book = await Book.find({}, (err, book) => {
                    if (err) { throw new Error(err) }
                })
                res.render('edit', {
                    succesfull: true,
                    book,
                    userLog
                })
            }
            catch (e) {
                if (bookWanted.n == 0) {
                    res.render('edit', {
                        error: true,
                        book,
                        userLog
                    })
                    return
                }
            }
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }

}
async function del(idBuscado, callback) {
    await eliminarFoto(idBuscado)
    await Book.deleteOne({ id: idBuscado }, callback)
}
async function toList(callback) {
    await Book.find({}, callback)
}
async function toListByTitle(titleBuscado, callback) {
    await Book.find({ title: titleBuscado }, callback)
}
async function wantedByID(IDBuscado, callback) {
    await Book.findOne({ id: IDBuscado }, callback)
}

async function eliminarFoto(idBook) {
    await Book.findOne({ id: idBook }, async function (err, bookWanted) {
        if (err) { throw new Error(err) }
        const urlImageDestructure = bookWanted.image.split("/")
        await fs.unlink(path.join(process.cwd(), `/src/public/imgs/${urlImageDestructure[4]}`), () => { })
    })
}
module.exports = {
    Save: save,
    Edit: edit,
    Delete: del,
    ToList: toList,
    ToListByTitle: toListByTitle,
    WantedById: wantedByID
}
