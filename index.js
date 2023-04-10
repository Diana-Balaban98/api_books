const express = require('express');
const ID = require('node-unique-id-generator');

const server = express();
require('dotenv').config();
server.use(require("express-form-data").parse());

const base_books = [
    { id: ID.generateUniqueId(), title: "Горе от ума", description: "Комедия сочетает в себе элементы классицизма", authors: "А.С. Грибоедов", favorite: "Нравится", fileCover: "Нет", fileName: "book.pdf" },
    { id: ID.generateUniqueId(), title: "Сказка о рыбаке и рыбке", description: "Впервые напечатана в 1835 году в журнале «Библиотека для чтения»", authors: "А.С. Пушкин", favorite: "Нравится", fileCover: "Нет", fileName: "book.pdf" },
    { id: ID.generateUniqueId(), title: "Война и мир", description: "Книга описывает русское общество в эпоху войн", authors: "Л.Н. Толстой", favorite: "Не нравится", fileCover:"Есть", fileName: "book.pdf" }, 
];


server.get("/api/books", (req, res) => res.json(base_books));


server.get("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const findId = base_books.find(el => el.id === id);

    if (findId) {
        res.json(findId);
    } else {
        res.status(404);
        res.send("Книга не найдена");
    }
});


server.post("/api/books", (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName} = req.body;

    if (!(title && description && authors && favorite && fileCover && fileName)) {
        res.send("Заполните до конца поля");

    } else {
        const book = req.body;

        base_books.push({ id: ID.generateUniqueId(), ...book });
        res.status(201);
        res.json(base_books.at(-1));
    }
});


server.put("/api/books/:id", (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const findId = base_books.findIndex(el => el.id === id);

    if (findId !== -1) {
console.log(findId);

        base_books[findId] = {
            ...base_books[findId],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }

        res.status(201).json(base_books[findId]);
    }

    res.status(404).json("Книга не найдена");
});


server.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const find = base_books.findIndex(el => el.id === id);

    if (find !== -1) {
        base_books.splice(find, 1);

        res.status(201).send(true);
    }

    res.status(404).send("Данная книга не найдена");
})


const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));


