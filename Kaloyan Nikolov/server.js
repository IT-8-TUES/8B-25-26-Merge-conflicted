const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Позволява на сървъра да чете JSON данни

const FILE_PATH = './database.json';

// Помощна функция: Чете данните от JSON файла
function readData() {
    if (!fs.existsSync(FILE_PATH)) {
        return { notes: [], resources: [] }; // Ако файлът не съществува, създава празна структура
    }
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
}

// Помощна функция: Записва данните в JSON файла
function writeData(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// 1. Вземане на всички записки (GET)
app.get('/api/notes', (req, res) => {
    const data = readData();
    res.json(data.notes);
});

// 2. Добавяне на нова записка (POST)
app.use('/api/notes', express.json());
app.post('/api/notes', (req, res) => {
    const data = readData();
    const newNote = req.body; // Данните от формата
    
    data.notes.unshift(newNote); // Добавяме я най-отпред
    writeData(data);
    
    res.json({ success: true, notes: data.notes });
});

// 3. Изтриване на записка (POST /delete)
app.post('/api/notes/delete', (req, res) => {
    const data = readData();
    const titleToDelete = req.body.title;

    data.notes = data.notes.filter(note => note.title !== titleToDelete);
    writeData(data);

    res.json({ success: true, notes: data.notes });
});

// Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`Сървърът работи на http://localhost:${PORT}`);
});