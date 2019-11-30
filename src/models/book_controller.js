let Book = require('../models/book')
const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

async function save(req, res, callback) {
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
    await book.save(callback)
}
async function edit(req, res, callback) {
    const { title, author,id, description, status } = req.body
    await eliminarFoto(id)
    const { filename } = req.file
    await Book.updateOne({ id}, {
        title,
        author,
        id,
        image:`http://${process.env.APP_HOST}:${process.env.APP_PORT}/public/${filename}`,
        description,
        status
    }, callback)
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
